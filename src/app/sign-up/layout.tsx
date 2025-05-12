export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex py-10 w-full items-center justify-center">
      <div className="w-full max-w-md p-6 bg-zinc-900 rounded">{children}</div>
    </div>
  );
}
