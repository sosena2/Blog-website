"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserIcon,
  LockClosedIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const settingsItems = [
  {
    label: "Profile",
    href: "/dashboard/settings",
    icon: UserIcon,
  },
  {
    label: "Account",
    href: "/dashboard/settings/account",
    icon: LockClosedIcon,
  },
  {
    label: "Password",
    href: "/dashboard/settings/password",
    icon: LockClosedIcon,
  },
  {
    label: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: BellIcon,
  },
];

export default function SettingSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-black">
        Settings
      </h1>

      {/* Card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#D8E8ED]">
        <ul className="space-y-2">
          {settingsItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 rounded-xl px-5 py-4 text-lg font-medium transition
                    ${
                      isActive
                        ? "bg-[#E2F3F7] text-[#0F4C5C]"
                        : "text-[#365865] hover:bg-[#ECF7FA]"
                    }
                  `}
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      isActive ? "text-[#0F4C5C]" : "text-[#4B6C77]"
                    }`}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}