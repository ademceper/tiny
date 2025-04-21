import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserAvatarProfile() {
  return (
    <div className='flex items-center gap-2'>
      <Avatar >
        <AvatarImage src={''} alt={''} />
        <AvatarFallback className='rounded-lg'>
          { 'CN'}
        </AvatarFallback>
      </Avatar>

    </div>
  );
}
