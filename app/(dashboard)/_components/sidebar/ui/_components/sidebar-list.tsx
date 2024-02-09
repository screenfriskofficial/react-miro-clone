'use client';
import { useOrganizationList } from '@clerk/nextjs';
import { SidebarItem } from './sidebar-item';

const SidebarList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <ul className={'flex flex-col gap-y-4'}>
      {userMemberships.data?.map((member) => (
        <SidebarItem
          key={member.organization.id}
          id={member.organization.id}
          name={member.organization.name}
          imageUrl={member.organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export { SidebarList };
