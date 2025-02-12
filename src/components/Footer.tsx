export default function Footer({ name }: { name: string }) {
  return (
    <footer className="text-center bg-accent-gradient text-white py-20">
      © {new Date().getFullYear()} {name} <br /> All rights reserved
    </footer>
  );
}
