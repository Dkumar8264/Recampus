import { GoogleLogin } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export function GoogleSignInButton({ onCredential, onError, label = 'signin_with', isDisabled = false }) {
  if (!googleClientId) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-200 bg-white/80 px-3 py-3 text-center text-xs leading-5 text-stone-500">
        Add `VITE_GOOGLE_CLIENT_ID` to enable Google login.
      </div>
    );
  }

  return (
    <div className={isDisabled ? 'pointer-events-none opacity-60' : ''}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            onCredential(credentialResponse.credential);
          } else {
            onError?.();
          }
        }}
        onError={onError}
        text={label}
        shape="rectangular"
        size="large"
        theme="outline"
        width="320"
      />
    </div>
  );
}
