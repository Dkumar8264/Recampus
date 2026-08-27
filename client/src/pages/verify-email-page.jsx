import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthFormCard } from '../components/auth-form-card.jsx';
import { FormField } from '../components/form-field.jsx';
import { useAuth } from '../context/auth-context.jsx';

export function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resendVerification, verifyEmail } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    email: location.state?.email ?? '',
    otp: ''
  });

  const handleChange = (event) => {
    setFormValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await verifyEmail(formValues);
      toast.success('Email verified.');
      navigate('/browse', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification(formValues.email);
      toast.success('New code sent.');
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Could not resend code.');
    }
  };

  return (
    <AuthFormCard title="Verify email" subtitle="Enter the 6-digit code sent to your college inbox.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          label="College email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formValues.email}
          required
          onChange={handleChange}
        />
        <FormField
          label="Verification code"
          id="otp"
          name="otp"
          inputMode="numeric"
          pattern="[0-9]{6}"
          autoComplete="one-time-code"
          value={formValues.otp}
          required
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3"
        >
          {isSubmitting ? 'Verifying...' : 'Verify email'}
        </button>
      </form>
      <button
        type="button"
        onClick={handleResend}
        className="btn-secondary mt-4"
      >
        Resend code
      </button>
    </AuthFormCard>
  );
}
