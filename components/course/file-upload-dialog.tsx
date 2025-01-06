'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileSpreadsheet, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Separator } from "@/components/ui/separator"

interface FileUploadDialogProps {
  open: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export function FileUploadDialog({
  open,
  onClose,
  onUpload,
}: FileUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false
  })

  const handleDownloadTemplate = () => {
    const link = document.createElement('a')
    link.href = '/课程表.png'
    link.download = '课程表模板.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleContinue = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>导入文件</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8
              flex flex-col items-center justify-center gap-4
              cursor-pointer
              hover:border-primary
              transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted'}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-center text-muted-foreground">
              点击或将文件拖拽到此处上传
            </p>
            {selectedFile && (
              <p className="text-sm font-medium">{selectedFile.name}</p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            支持的文件格式：PDF、JPG、PNG
          </p>
          <Separator />
          {!selectedFile && (
            <div className="text-sm text-muted-foreground">
              <p className="mb-2 text-black">如果您没有模板文件，可以下载示例模板：</p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDownloadTemplate}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                下载示例模板
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleContinue} disabled={!selectedFile}>
            导入
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

