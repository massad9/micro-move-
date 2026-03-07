import React, { useState, useRef } from 'react'
import { LogOut, Image as ImageIcon, Camera } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'

interface UserAvatarDropdownProps {
    onLogout?: () => void
}

export const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({ onLogout }) => {
    // Fallback logic in case store fails to provide user data easily to a guest
    const storeUser = useMicroMoveStore(state => state.user)
    const updateUser = useMicroMoveStore(state => state.updateUser)
    const user = storeUser || { name: 'المستخدم', email: 'user@micromove.com', role: 'employee', avatar: '' }
    
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false)
    const [newPhotoUrl, setNewPhotoUrl] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const tempUrl = URL.createObjectURL(file)
            setNewPhotoUrl(tempUrl)
        }
    }

    const handleSavePhoto = () => {
        if (newPhotoUrl) {
            updateUser({ avatar: newPhotoUrl })
        }
        setIsPhotoDialogOpen(false)
    }

    const avatarSrc = user.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}&backgroundColor=f97316`

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="rounded-full outline-none focus:ring-4 focus:ring-orange-500/20 active:scale-95 transition-all outline-offset-2">
                        <Avatar className="w-10 h-10 border-2 border-slate-200 shadow-sm transition-transform hover:scale-105 bg-white">
                            <AvatarImage src={avatarSrc} className="object-cover" />
                            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">{user.name[0]}</AvatarFallback>
                        </Avatar>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 rounded-2xl font-sans mt-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-slate-100 z-50" dir="rtl">
                    <DropdownMenuLabel className="font-bold flex flex-col gap-1 px-4 py-3 bg-slate-50/50 rounded-t-xl">
                        <span className="text-slate-800 text-base">{user.name}</span>
                        <span className="text-xs text-slate-500 font-medium font-sans truncate" dir="ltr">{user.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem 
                        onClick={() => {
                            setNewPhotoUrl('')
                            setIsPhotoDialogOpen(true)
                        }}
                        className="cursor-pointer gap-3 px-4 py-3 focus:bg-orange-50 focus:text-orange-600 font-bold transition-colors hover:text-orange-600 group"
                    >
                        <ImageIcon className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                        تغيير الصورة الشخصية
                    </DropdownMenuItem>
                    
                    {onLogout && (
                        <>
                            <DropdownMenuSeparator className="bg-slate-100" />
                            <DropdownMenuItem 
                                onClick={onLogout}
                                className="cursor-pointer gap-3 px-4 py-3 focus:bg-red-50 focus:text-red-600 text-red-500 font-bold transition-colors group"
                            >
                                <LogOut className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                تسجيل الخروج
                            </DropdownMenuItem>
                        </>
                    )}
                 </DropdownMenuContent>
             </DropdownMenu>

             {/* Photo Upload Modal */}
             <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
                <DialogContent className="font-sans sm:max-w-[400px] rounded-[2rem] gap-0 p-0 overflow-hidden shadow-2xl border-0" dir="rtl">
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-orange-100 to-orange-50 z-0"></div>
                    
                    <DialogHeader className="px-6 pt-10 pb-4 relative z-10 text-center flex flex-col items-center">
                        <DialogTitle className="text-xl font-black text-slate-800 mb-2">الصورة الشخصية</DialogTitle>
                        <DialogDescription className="text-slate-500 text-sm font-medium leading-relaxed max-w-[280px] mx-auto hidden">
                            ارفع صورة جديدة من جهازك
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex flex-col items-center gap-6 px-6 py-4 relative z-10 mb-2">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Avatar className="w-32 h-32 shadow-xl border-4 border-white ring-1 ring-slate-100 group-hover:scale-105 transition-transform duration-300">
                                <AvatarImage src={newPhotoUrl || avatarSrc} className="object-cover" />
                                <AvatarFallback className="bg-slate-100 text-4xl font-black text-slate-300">{user.name[0]}</AvatarFallback>
                            </Avatar>
                            
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            
                            <div className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm scale-100 transition-transform">
                                <PlusIcon className="w-5 h-5" />
                            </div>
                        </div>

                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <Button 
                            variant="outline" 
                            className="rounded-xl h-12 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageIcon className="w-4 h-4 ml-2 opacity-50" />
                            اختر صورة من الجهاز
                        </Button>
                    </div>
                    
                    <DialogFooter className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex flex-row gap-3 sm:justify-between items-center z-10 relative">
                        <Button 
                            variant="ghost" 
                            className="flex-1 sm:flex-none h-12 rounded-xl text-slate-500 font-bold hover:bg-slate-200/50"
                            onClick={() => {
                                setNewPhotoUrl('')
                                setIsPhotoDialogOpen(false)
                            }}
                        >
                            إلغاء
                        </Button>
                        <Button 
                            className="flex-1 sm:px-10 h-12 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none"
                            onClick={handleSavePhoto} 
                            disabled={!newPhotoUrl}
                        >
                            حفظ التغييرات
                        </Button>
                    </DialogFooter>
                </DialogContent>
             </Dialog>
        </>
    )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
