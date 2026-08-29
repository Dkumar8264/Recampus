import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormCard } from '../components/auth-form-card.jsx';
import { FormField } from '../components/form-field.jsx';
import { GoogleSignInButton } from '../components/google-sign-in-button.jsx';
import { useAuth } from '../context/auth-context.jsx';

export function SignupPage() {
  const { googleLogin, signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    year: ''
  });

  const handleChange = (event) => {
    setFormValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await signup({ ...formValues, year: Number(formValues.year) });
      toast.success('Check your college email for the code.');
      navigate('/verify-email', { state: { email: formValues.email } });
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Signup failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setIsSubmitting(true);

    try {
      await googleLogin(credential);
      toast.success('Google account verified.');
      navigate('/browse', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Google signup failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormCard title="Create account" subtitle="College email verification is enforced by the API.">
      <div className="mb-5 flex justify-center">
        <GoogleSignInButton
          onCredential={handleGoogleCredential}
          onError={() => toast.error('Google signup failed.')}
          label="signup_with"
          isDisabled={isSubmitting}
        />
      </div>

      <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-white/35">
        <span className="h-px flex-1 bg-white/10" />
        <span>Email signup</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField label="Name" id="name" name="name" autoComplete="name" required onChange={handleChange} />
        <FormField
          label="College email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={handleChange}
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          onChange={handleChange}
        />
        <FormField label="Branch" id="branch" name="branch" required onChange={handleChange} />
        <FormField label="Year" id="year" name="year" type="number" min="1" max="8" required onChange={handleChange} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3"
        >
          {isSubmitting ? 'Creating...' : 'Create account'}
        </button>
      </form>
      <p className="mt-5 text-sm text-white/55">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-campus">
          Log in
        </Link>
      </p>
    </AuthFormCard>
  );
}
