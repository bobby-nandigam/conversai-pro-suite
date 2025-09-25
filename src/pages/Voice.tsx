import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Settings,
  Download,
  Upload,
  AudioWaveform,
  MessageSquare,
  Bot,
  Languages,
  Clock,
  BarChart3,
  Headphones,
  Speaker,
  Sliders,
  FileAudio,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

// Mock data
const voiceModels = [
  { id: 'aria', name: 'Aria', type: 'Premium', language: 'English', accent: 'American', quality: 'Ultra HD' },
  { id: 'roger', name: 'Roger', type: 'Standard', language: 'English', accent: 'British', quality: 'HD' },
  { id: 'sarah', name: 'Sarah', type: 'Premium', language: 'English', accent: 'Australian', quality: 'Ultra HD' },
  { id: 'laura', name: 'Laura', type: 'Standard', language: 'Spanish', accent: 'Latin American', quality: 'HD' },
  { id: 'charlie', name: 'Charlie', type: 'Premium', language: 'French', accent: 'Parisian', quality: 'Ultra HD' },
];

const voiceAnalytics = {
  totalInteractions: 15240,
  averageDuration: '2m 34s',
  successRate: 94.7,
  topLanguages: [
    { language: 'English', usage: 78, conversations: 11887 },
    { language: 'Spanish', usage: 15, conversations: 2286 },
    { language: 'French', usage: 4, conversations: 610 },
    { language: 'German', usage: 3, conversations: 457 }
  ]
};

const recentRecordings = [
  { id: 1, name: 'Customer Support Session', duration: '3:45', size: '2.4 MB', date: '2 hours ago', type: 'conversation' },
  { id: 2, name: 'Voice Training Sample', duration: '1:20', size: '890 KB', date: '5 hours ago', type: 'training' },
  { id: 3, name: 'Bot Response Test', duration: '0:45', size: '524 KB', date: '1 day ago', type: 'test' },
  { id: 4, name: 'Multi-language Demo', duration: '5:12', size: '3.8 MB', date: '2 days ago', type: 'demo' }
];

const Voice: React.FC = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState('aria');
  const [volume, setVolume] = useState(75);
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [textToSpeak, setTextToSpeak] = useState('Hello! I am your AI voice assistant. How can I help you today?');
  
  // Voice settings
  const [enableSTT, setEnableSTT] = useState(true);
  const [enableTTS, setEnableTTS] = useState(true);
  const [enableInterruption, setEnableInterruption] = useState(true);
  const [enableNoiseReduction, setEnableNoiseReduction] = useState(true);
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(true);

  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    toast({
      title: "Recording Started",
      description: "Voice recording is now active",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
    toast({
      title: "Recording Stopped",
      description: `Recorded ${Math.floor(recordingTime / 60)}:${String(recordingTime % 60).padStart(2, '0')}`,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Playback Paused" : "Playback Started",
      description: isPlaying ? "Audio playback paused" : "Playing voice sample",
    });
  };

  const handleSpeakText = () => {
    if (textToSpeak.trim()) {
      toast({
        title: "Text-to-Speech Started",
        description: `Speaking with ${voiceModels.find(v => v.id === selectedVoice)?.name} voice`,
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conversation': return <MessageSquare className="w-4 h-4" />;
      case 'training': return <Bot className="w-4 h-4" />;
      case 'test': return <Zap className="w-4 h-4" />;
      case 'demo': return <Play className="w-4 h-4" />;
      default: return <FileAudio className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Voice Interface</h2>
          <p className="text-muted-foreground">
            Manage speech-to-text, text-to-speech, and voice interactions for your AI assistants
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Audio
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Voice Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recorder" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recorder">Voice Recorder</TabsTrigger>
          <TabsTrigger value="synthesis">Text-to-Speech</TabsTrigger>
          <TabsTrigger value="models">Voice Models</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="recorder" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Voice Recorder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="w-5 h-5 mr-2" />
                  Voice Recorder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      className="w-20 h-20 rounded-full"
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                    >
                      {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </Button>
                    {isRecording && (
                      <div className="absolute -inset-2 rounded-full border-2 border-red-500 animate-pulse" />
                    )}
                  </div>
                  
                  {isRecording && (
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-mono text-red-500">
                        {formatTime(recordingTime)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <AudioWaveform className="w-4 h-4 animate-pulse" />
                        <Progress value={(recordingTime % 10) * 10} className="w-32" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Volume</Label>
                    <span className="text-sm text-muted-foreground">{volume}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <VolumeX className="w-4 h-4" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="flex-1"
                    />
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Recordings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileAudio className="w-5 h-5 mr-2" />
                  Recent Recordings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentRecordings.map((recording) => (
                  <div key={recording.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(recording.type)}
                      <div>
                        <p className="font-medium">{recording.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{recording.duration}</span>
                          <span>•</span>
                          <span>{recording.size}</span>
                          <span>•</span>
                          <span>{recording.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="synthesis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Speaker className="w-5 h-5 mr-2" />
                Text-to-Speech Synthesis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="voice-select">Voice Model</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voiceModels.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div className="flex items-center space-x-2">
                              <span>{voice.name}</span>
                              <Badge variant="secondary">{voice.type}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Speed: {speed}x</Label>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label>Pitch: {pitch}x</Label>
                      <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={pitch}
                        onChange={(e) => setPitch(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Selected Voice Details</Label>
                    <div className="mt-2 p-4 border rounded-lg space-y-2">
                      {voiceModels
                        .filter(voice => voice.id === selectedVoice)
                        .map(voice => (
                          <div key={voice.id} className="space-y-2">
                            <div className="flex justify-between">
                              <span>Name:</span>
                              <span className="font-medium">{voice.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Language:</span>
                              <span>{voice.language}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Accent:</span>
                              <span>{voice.accent}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quality:</span>
                              <Badge>{voice.quality}</Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label htmlFor="text-input">Text to Synthesize</Label>
                <Textarea
                  id="text-input"
                  placeholder="Enter the text you want to convert to speech..."
                  value={textToSpeak}
                  onChange={(e) => setTextToSpeak(e.target.value)}
                  rows={4}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleSpeakText} className="flex-1">
                    <Speaker className="w-4 h-4 mr-2" />
                    Generate Speech
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Audio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                Available Voice Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {voiceModels.map((voice) => (
                  <div key={voice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{voice.name}</h3>
                          <Badge variant={voice.type === 'Premium' ? 'default' : 'secondary'}>
                            {voice.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Languages className="w-3 h-3 mr-1" />
                            {voice.language}
                          </span>
                          <span className="flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {voice.accent}
                          </span>
                          <span className="flex items-center">
                            <Shield className="w-3 h-3 mr-1" />
                            {voice.quality}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant={selectedVoice === voice.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        {selectedVoice === voice.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{voiceAnalytics.totalInteractions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{voiceAnalytics.averageDuration}</div>
                <p className="text-xs text-muted-foreground">-3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{voiceAnalytics.successRate}%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Languages</CardTitle>
                <Languages className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{voiceAnalytics.topLanguages.length}</div>
                <p className="text-xs text-muted-foreground">Supported languages</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Language Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {voiceAnalytics.topLanguages.map((lang, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-sm text-muted-foreground">
                      {lang.conversations.toLocaleString()} conversations ({lang.usage}%)
                    </span>
                  </div>
                  <Progress value={lang.usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sliders className="w-5 h-5 mr-2" />
                  Voice Recognition Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Speech-to-Text</Label>
                    <p className="text-sm text-muted-foreground">Enable voice input recognition</p>
                  </div>
                  <Switch checked={enableSTT} onCheckedChange={setEnableSTT} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Text-to-Speech</Label>
                    <p className="text-sm text-muted-foreground">Enable voice output synthesis</p>
                  </div>
                  <Switch checked={enableTTS} onCheckedChange={setEnableTTS} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Language Detection</Label>
                    <p className="text-sm text-muted-foreground">Automatically detect spoken language</p>
                  </div>
                  <Switch checked={autoDetectLanguage} onCheckedChange={setAutoDetectLanguage} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Voice Interruption</Label>
                    <p className="text-sm text-muted-foreground">Allow users to interrupt bot speech</p>
                  </div>
                  <Switch checked={enableInterruption} onCheckedChange={setEnableInterruption} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Audio Quality Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Noise Reduction</Label>
                    <p className="text-sm text-muted-foreground">Reduce background noise in recordings</p>
                  </div>
                  <Switch checked={enableNoiseReduction} onCheckedChange={setEnableNoiseReduction} />
                </div>

                <div className="space-y-2">
                  <Label>Audio Quality</Label>
                  <Select defaultValue="hd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (16 kHz)</SelectItem>
                      <SelectItem value="hd">HD (24 kHz)</SelectItem>
                      <SelectItem value="ultrahd">Ultra HD (48 kHz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Recording Format</Label>
                  <Select defaultValue="wav">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wav">WAV (Lossless)</SelectItem>
                      <SelectItem value="mp3">MP3 (Compressed)</SelectItem>
                      <SelectItem value="flac">FLAC (Lossless)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Voice;