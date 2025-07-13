import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	AlertCircle,
	ArrowLeft,
	CheckCircle,
	Lightbulb,
	Mic,
	MicOff,
	Play,
	Square,
	Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

type RoomParams = {
	id: string;
};

const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
	const params = useParams<RoomParams>();
	const [isRecording, setIsRecording] = useState(false);
	const [recordingDuration, setRecordingDuration] = useState(0);
	const [uploadStatus, setUploadStatus] = useState<
		"idle" | "uploading" | "success" | "error"
	>("idle");
	const [chunksUploaded, setChunksUploaded] = useState(0);
	const recorder = useRef<MediaRecorder | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			if (durationIntervalRef.current) {
				clearInterval(durationIntervalRef.current);
			}
		};
	}, []);

	function stopRecording() {
		setIsRecording(false);
		setRecordingDuration(0);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		if (durationIntervalRef.current) {
			clearInterval(durationIntervalRef.current);
		}
	}

	async function uploadAudio(audio: Blob) {
		try {
			setUploadStatus("uploading");

			const formData = new FormData();
			formData.append("file", audio, "audio.webm");

			const response = await fetch(
				`http://localhost:3333/rooms/${params.id}/audio`,
				{
					method: "POST",
					body: formData,
				},
			);

			if (response.ok) {
				await response.json();
				setUploadStatus("success");
				setChunksUploaded((prev) => prev + 1);

				setTimeout(() => {
					setUploadStatus("idle");
				}, 2000);
			} else {
				setUploadStatus("error");
			}
		} catch (error) {
			console.error("Error uploading audio:", error);
			setUploadStatus("error");
		}
	}

	function createRecorder(audio: MediaStream) {
		recorder.current = new MediaRecorder(audio, {
			mimeType: "audio/webm;",
			audioBitsPerSecond: 164_000,
		});

		recorder.current.ondataavailable = (event) => {
			if (event.data.size > 0) {
				uploadAudio(event.data);
			}
		};

		recorder.current.onstart = () => {
			console.log("Gravação iniciada");
		};

		recorder.current.onstop = () => {
			console.log("Gravação finalizada");
		};

		recorder.current.start();
	}

	async function startRecording() {
		if (!isRecordingSupported) {
			alert("Gravação de áudio não suportada");
			return;
		}

		try {
			setIsRecording(true);
			setRecordingDuration(0);
			setChunksUploaded(0);

			const audio = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44_100,
				},
			});

			createRecorder(audio);

			durationIntervalRef.current = setInterval(() => {
				setRecordingDuration((prev) => prev + 1);
			}, 1000);

			intervalRef.current = setInterval(() => {
				recorder.current?.stop();
				createRecorder(audio);
			}, 5000);
		} catch (error) {
			console.error("Error starting recording:", error);
			setIsRecording(false);
		}
	}

	const formatDuration = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const getUploadStatusIcon = () => {
		switch (uploadStatus) {
			case "uploading":
				return (
					<div className="animate-spin size-4 border-2 border-blue-500 border-t-transparent rounded-full" />
				);
			case "success":
				return <CheckCircle className="size-4 text-green-500" />;
			case "error":
				return <AlertCircle className="size-4 text-red-500" />;
			default:
				return null;
		}
	};

	if (!params.id) {
		return <Navigate replace to="/" />;
	}

	if (!isRecordingSupported) {
		return (
			<div className="min-h-screen bg-zinc-950 flex items-center justify-center">
				<Card className="w-full max-w-md mx-4">
					<CardHeader>
						<CardTitle className="text-center text-red-600">
							Não Suportado
						</CardTitle>
						<CardDescription className="text-center">
							Gravação de áudio não é suportada neste navegador
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center">
						<Link to={`/room/${params.id}`}>
							<Button variant="outline">
								<ArrowLeft className="mr-2 size-4" />
								Voltar para a Sala
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-950">
			<div className="container mx-auto max-w-2xl px-4 py-8">
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<Link to={`/room/${params.id}`}>
							<Button variant="outline" size="sm">
								<ArrowLeft className="mr-2 size-4" />
								Voltar para a Sala
							</Button>
						</Link>
						<Badge variant="secondary" className="hidden sm:flex">
							Sala de Gravação
						</Badge>
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-2">
						Gravação de Áudio
					</h1>
					<p className="text-muted-foreground">
						Grave conteúdo para alimentar o contexto da IA
					</p>
				</div>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Volume2 className="size-5" />
							Controle de Gravação
						</CardTitle>
						<CardDescription>
							O áudio será processado automaticamente em chunks de 5 segundos
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-center">
							<div className="text-center space-y-2">
								<div
									className={`size-20 rounded-full flex items-center justify-center transition-all duration-300 ${
										isRecording
											? "bg-red-500/20 border-2 border-red-500 animate-pulse"
											: "bg-primary/20 border-2 border-primary"
									}`}
								>
									{isRecording ? (
										<MicOff className="size-8 text-red-500" />
									) : (
										<Mic className="size-8 text-primary" />
									)}
								</div>
								<div className="space-y-1">
									{isRecording && (
										<p className="text-lg font-mono text-primary text-center">
											{formatDuration(recordingDuration)}
										</p>
									)}
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							{isRecording ? (
								<Button
									onClick={stopRecording}
									size="lg"
									variant="destructive"
									className="flex items-center gap-2"
								>
									<Square className="size-4" />
									Parar Gravação
								</Button>
							) : (
								<Button
									onClick={startRecording}
									size="lg"
									className="flex items-center gap-2"
								>
									<Play className="size-4" />
									Iniciar Gravação
								</Button>
							)}
						</div>

						{(uploadStatus !== "idle" || chunksUploaded > 0) && (
							<div className="border-t pt-4">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">
										Status do Upload:
									</span>
									<div className="flex items-center gap-2">
										{getUploadStatusIcon()}
										<span
											className={`font-medium ${
												uploadStatus === "success"
													? "text-green-600"
													: uploadStatus === "error"
														? "text-red-600"
														: uploadStatus === "uploading"
															? "text-blue-600"
															: "text-foreground"
											}`}
										>
											{uploadStatus === "uploading"
												? "Enviando..."
												: uploadStatus === "success"
													? "Sucesso!"
													: uploadStatus === "error"
														? "Erro no upload"
														: "Aguardando"}
										</span>
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Lightbulb className="size-4" />
							Dicas para uma boa gravação
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li className="flex items-start gap-2">
								<span className="text-primary">•</span>
								Fale de forma clara e pausada
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">•</span>
								Evite ruídos de fundo
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">•</span>O áudio é processado
								automaticamente a cada 5 segundos
							</li>
							<li className="flex items-start gap-2">
								<span className="text-primary">•</span>
								Grave conteúdo relevante para melhorar as respostas da IA
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
