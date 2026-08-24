import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormCard } from '../components/auth-form-card.jsx';
import { FormField } from '../components/form-field.jsx';
import { useAuth } from '../context/auth-context.jsx';

export function SignupPage() {
  const { signup } = useAuth();
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
      toast.success('Account created.');
      navigate('/browse');
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Signup failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormCard title="Create account" subtitle="College email verification is enforced by the API.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField label="Name" id="name" name="name" required onChange={handleChange} />
        <FormField label="College email" id="email" name="email" type="email" required onChange={handleChange} />
        <FormField label="Password" id="password" name="password" type="password" required onChange={handleChange} />
        <FormField label="Branch" id="branch" name="branch" required onChange={handleChange} />
        <FormField label="Year" id="year" name="year" type="number" min="1" max="8" required onChange={handleChange} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-campus px-4 py-3 text-sm font-semibold text-white hover:bg-[#135a72] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Creating...' : 'Create account'}
        </button>
      </form>
      <p className="mt-5 text-sm text-stone-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-campus">
          Log in
        </Link>
      </p>
    </AuthFormCard>
  );
}
