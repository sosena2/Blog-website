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
      <h1 className="text-4xl font-bold text-gray-900">
        Settings
      </h1>

      {/* Card */}
      <div className="rounded-2xl bg-white p-4 shadow-md">
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
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      isActive ? "text-purple-600" : "text-gray-700"
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