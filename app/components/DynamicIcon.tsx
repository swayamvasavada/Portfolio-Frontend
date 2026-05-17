import React from 'react';

// Import entire specific icon families from react-icons
import * as FaIcons from 'react-icons/fa'; // FontAwesome (e.g., "FaJava")
import * as SiIcons from 'react-icons/si'; // SimpleIcons (e.g., "SiSpringboot")
import * as MdIcons from 'react-icons/md'; // Material Design (e.g., "MdEmail")
import * as TbIcons from 'react-icons/tb'; // Tabler Icons (e.g., "TbApi")

interface DynamicIconProps {
  name: string;                // The exact string from your DB (e.g., "SiNextdotjs")
  className?: string;          // Tailwind styling
  style?: React.CSSProperties; // Inline styles for dynamic DB colors
}

export default function DynamicIcon({ name, className, style }: DynamicIconProps) {
  let IconComponent;

  // Dynamically route the request to the correct imported library based on the prefix
  if (name.startsWith('Fa')) {
    IconComponent = FaIcons[name as keyof typeof FaIcons];
  } else if (name.startsWith('Si')) {
    IconComponent = SiIcons[name as keyof typeof SiIcons];
  } else if (name.startsWith('Md')) {
    IconComponent = MdIcons[name as keyof typeof MdIcons];
  } else if (name.startsWith('Tb')) {
    IconComponent = TbIcons[name as keyof typeof TbIcons];
  }

  // Fallback if you misspell the icon name in your database or leave it blank
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return <div className={`bg-slate-800 border border-slate-700 rounded-md ${className}`} style={style} title="Icon missing" />;
  }

  // Render the matched icon with both Tailwind classes and inline styles
  return <IconComponent className={className} style={style} />;
}