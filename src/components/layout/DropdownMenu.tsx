import React from 'react'

interface DropdownMenuProps {
  isActive: boolean
  usernames: string[]
  onUsernameClick: (username: string) => void
  activeUsername?: string
}

const DropdownMenu = ({
  isActive,
  usernames,
  onUsernameClick,
  activeUsername,
}: DropdownMenuProps) => (
  <div
    className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
      isActive ? '' : 'hidden'
    }`}
    role='menu'
    aria-orientation='vertical'
    aria-labelledby='menu-button'
    tabIndex={-1}
  >
    <div className='py-1' role='none'>
      {usernames.map((username, index) => (
        <a
          key={`username-${index}`}
          href='#'
          className={`block px-4 py-2 text-sm ${
            username === activeUsername
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-700'
          }`}
          role='menuitem'
          tabIndex={-1}
          id={`menu-item-${index}`}
          onClick={() => onUsernameClick(username)}
        >
          {username}
        </a>
      ))}
    </div>
  </div>
)

export default DropdownMenu
