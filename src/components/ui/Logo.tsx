import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  linked?: boolean;
  onClick?: () => void;
};

export function Logo({
  className,
  imageClassName,
  priority = false,
  linked = true,
  onClick,
}: LogoProps) {
  const image = (
    <Image
      src={siteConfig.logo}
      alt={`${siteConfig.name} logo`}
      width={320}
      height={320}
      priority={priority}
      className={cn("h-auto w-auto max-h-11 sm:max-h-12 md:max-h-14", imageClassName)}
    />
  );

  if (!linked) {
    return <span className={cn("inline-flex shrink-0", className)}>{image}</span>;
  }

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex shrink-0 transition hover:opacity-90", className)}
    >
      {image}
    </Link>
  );
}
