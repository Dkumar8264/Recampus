import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthFormCard } from '../components/auth-form-card.jsx';
import { FormField } from '../components/form-field.jsx';
import { useAuth } from '../context/auth-context.jsx';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setFormValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formValues);
      toast.success('Welcome back.');
      navigate(location.state?.from?.pathname ?? '/browse', { replace: true });
    } catch (error) {
      if (error.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
        toast.error('Verify your email first.');
        navigate('/verify-email', {
          state: { email: error.response.data.details?.email ?? formValues.email }
        });
        return;
      }

      toast.error(error.response?.data?.message ?? 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormCard title="Log in" subtitle="Use your verified college account.">
      <form className="space-y-4" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          required
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-11 w-full rounded-md bg-campus px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#135a72] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <p className="mt-5 text-sm text-stone-600">
        New here?{' '}
        <Link to="/signup" className="font-semibold text-campus">
          Create an account
        </Link>
      </p>
    </AuthFormCard>
  );
}
