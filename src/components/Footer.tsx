export default function Footer({ name }: { name: string }) {
  return (
    <footer className="text-center bg-linear-to-b from-background/0 to-foreground/90 text-white py-20">
      © {new Date().getFullYear()} {name} <br /> All rights reserved
    </footer>
  );
}
