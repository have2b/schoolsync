'use client';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input } from '@/components';
import { useAuth } from '@/store/auth';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

interface ChangePasswordDialogProps {
  username: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ChangePasswordDialog = ({ username, isOpen, onOpenChange }: ChangePasswordDialogProps) => {
  const t = useTranslations();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { changePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t('auth.status.newPassNotMatch'));
      return;
    }

    try {
      const res = await changePassword(username, oldPassword, newPassword);
      console.log(res);
      if (res.status !== 200) {
        toast.error(t(`auth.status.${res.message}`));
      } else {
        toast.success(t('auth.status.changePassSuccess'));
      }

      onOpenChange(false);
      // Reset form
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to change password');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            {t('auth.actions.changePass')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="password"
            placeholder={t('auth.status.oldPasswordPlaceholder')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="bg-zinc-200 focus:bg-white"
            required
          />
          <Input
            type="password"
            placeholder={t('auth.status.newPasswordPlaceholder')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-zinc-200 focus:bg-white"
            required
          />
          <Input
            type="password"
            placeholder={t('auth.status.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-zinc-200 focus:bg-white"
            required
          />
          <Button type="submit" className="w-full bg-secondary py-4 hover:bg-secondary-foreground">
            <span className="text-lg">{t('auth.actions.changePass')}</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
