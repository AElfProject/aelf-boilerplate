import { useCopyToClipboard } from 'react-use';
import IconFont from 'components/IconFont';
export default function Copy({
  toCopy,
  children,
  className,
}: {
  toCopy: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [isCopied, setCopied] = useCopyToClipboard();
  return (
    <span onClick={() => setCopied(toCopy)} className={className}>
      {isCopied.value ? (
        'Copied'
      ) : (
        <>
          <IconFont type="copy" />
          {children}
        </>
      )}
    </span>
  );
}
