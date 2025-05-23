# Delete course related components
Remove-Item -Path "components/course" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/course-card.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/course-schedule.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/teacher-avatar.tsx" -Force -ErrorAction SilentlyContinue

# Delete family management related components
Remove-Item -Path "components/family-calendar.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/member-card.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/member-form.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/member-list.tsx" -Force -ErrorAction SilentlyContinue

# Delete blog and editor related components
Remove-Item -Path "components/editor.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/post-create-button.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/post-item.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/post-operations.tsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "components/mdx-card.tsx" -Force -ErrorAction SilentlyContinue

# Delete related API routes
Remove-Item -Path "app/api/posts" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "app/api/events" -Recurse -Force -ErrorAction SilentlyContinue

# Delete related validation files
Remove-Item -Path "lib/validations/post.ts" -Force -ErrorAction SilentlyContinue

Write-Host "Cleanup completed! Removed unused components and files."
