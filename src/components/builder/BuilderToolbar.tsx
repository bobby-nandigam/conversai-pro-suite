import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Undo2,
  Redo2,
  Save,
  Play,
  AlignLeft,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Upload,
  Copy,
  Trash2,
  Settings2,
  Share2
} from 'lucide-react';

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onTest: () => void;
  onAutoLayout: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onExport: () => void;
  onImport: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  nodeCount: number;
  edgeCount: number;
  hasSelection: boolean;
  isSaving?: boolean;
}

export default memo(({
  onUndo,
  onRedo,
  onSave,
  onTest,
  onAutoLayout,
  onZoomIn,
  onZoomOut,
  onFitView,
  onExport,
  onImport,
  onDuplicate,
  onDelete,
  nodeCount,
  edgeCount,
  hasSelection,
  isSaving = false,
}: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-2">
        {/* History */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onUndo} className="h-8 w-8 p-0">
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onRedo} className="h-8 w-8 p-0">
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onZoomOut} className="h-8 w-8 p-0">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onZoomIn} className="h-8 w-8 p-0">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onFitView} className="h-8 w-8 p-0">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Layout */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onAutoLayout} className="h-8 px-3 gap-2">
            <AlignLeft className="w-4 h-4" />
            <span className="text-xs">Auto Layout</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Selection Actions */}
        {hasSelection && (
          <>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onDuplicate} className="h-8 w-8 p-0">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
          </>
        )}

        {/* Import/Export */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onImport} className="h-8 w-8 p-0">
            <Upload className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onExport} className="h-8 w-8 p-0">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Stats */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {nodeCount} nodes
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal">
            {edgeCount} connections
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onTest} className="h-8 gap-2">
            <Play className="w-4 h-4" />
            <span className="text-xs">Test</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-2">
            <Share2 className="w-4 h-4" />
            <span className="text-xs">Share</span>
          </Button>
          <Button 
            size="sm" 
            onClick={onSave} 
            disabled={isSaving}
            className="h-8 gap-2 bg-gradient-to-r from-primary to-primary/80"
          >
            <Save className="w-4 h-4" />
            <span className="text-xs">{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
});
