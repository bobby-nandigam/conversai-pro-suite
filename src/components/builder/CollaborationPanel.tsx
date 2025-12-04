import { memo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  MessageSquare,
  Clock,
  Send,
  AtSign,
  Smile,
  MoreHorizontal,
  UserPlus
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  status: 'online' | 'away' | 'offline';
  currentNode?: string;
}

interface Comment {
  id: string;
  author: TeamMember;
  content: string;
  timestamp: Date;
  nodeId?: string;
  replies?: Comment[];
}

interface Activity {
  id: string;
  user: TeamMember;
  action: string;
  target: string;
  timestamp: Date;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', color: '#3b82f6', status: 'online', currentNode: 'node-2' },
  { id: '2', name: 'Mike Johnson', color: '#a855f7', status: 'online', currentNode: 'node-3' },
  { id: '3', name: 'Emma Davis', color: '#ec4899', status: 'away' },
  { id: '4', name: 'Alex Turner', color: '#f59e0b', status: 'offline' },
];

const mockComments: Comment[] = [
  {
    id: '1',
    author: teamMembers[0],
    content: 'Should we add error handling to the API node?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    nodeId: 'node-4',
  },
  {
    id: '2',
    author: teamMembers[1],
    content: '@Sarah Chen Good idea! I\'ll add retry logic as well.',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    nodeId: 'node-4',
  },
  {
    id: '3',
    author: teamMembers[2],
    content: 'The sentiment analysis looks great!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    nodeId: 'node-2',
  },
];

const mockActivities: Activity[] = [
  { id: '1', user: teamMembers[0], action: 'modified', target: 'Sentiment Analysis', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
  { id: '2', user: teamMembers[1], action: 'connected', target: 'Check Intent → Database', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  { id: '3', user: teamMembers[0], action: 'added', target: 'API Response Node', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
  { id: '4', user: teamMembers[2], action: 'commented on', target: 'Trigger Node', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
];

export default memo(() => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-muted-foreground/50';
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: teamMembers[0],
      content: newComment,
      timestamp: new Date(),
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <Tabs defaultValue="team" className="h-full flex flex-col">
      <div className="px-4 pt-4 border-b border-border">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="team" className="text-xs">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Team
          </TabsTrigger>
          <TabsTrigger value="comments" className="text-xs">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-xs">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Activity
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="team" className="flex-1 m-0 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Online ({teamMembers.filter(m => m.status === 'online').length})
              </span>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <UserPlus className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="space-y-2">
              {teamMembers
                .filter(m => m.status === 'online')
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 border-2" style={{ borderColor: member.color }}>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback style={{ backgroundColor: member.color }} className="text-white text-xs font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      {member.currentNode && (
                        <p className="text-xs text-muted-foreground truncate">
                          Editing node...
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Away & Offline
              </span>
              {teamMembers
                .filter(m => m.status !== 'online')
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 rounded-lg opacity-60"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback style={{ backgroundColor: member.color }} className="text-white text-xs font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="comments" className="flex-1 m-0 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="group">
                <div className="flex gap-3">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback style={{ backgroundColor: comment.author.color }} className="text-white text-xs font-semibold">
                      {comment.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">{formatTime(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground/90 mt-0.5">{comment.content}</p>
                    {comment.nodeId && (
                      <Badge variant="secondary" className="text-xs mt-1.5">
                        On: {comment.nodeId}
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="relative">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[60px] pr-20 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <AtSign className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Smile className="w-3.5 h-3.5" />
              </Button>
              <Button size="sm" className="h-7 px-2" onClick={handleAddComment}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="activity" className="flex-1 m-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3 py-2">
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarFallback style={{ backgroundColor: activity.user.color }} className="text-white text-[10px] font-semibold">
                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground"> {activity.action} </span>
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
});
