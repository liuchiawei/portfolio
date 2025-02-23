import SNSLinks from "./SNSLinks";

export default function Footer({ name }: { name: string }) {
  return (
    <footer className="text-center p-20 bg-linear-to-b from-transparent to-foreground/10">
      <SNSLinks />
      <p className="text-center text-sm text-foreground/50">
        © {new Date().getFullYear()} {name}　|　All rights reserved
      </p>
    </footer>
  );
}
