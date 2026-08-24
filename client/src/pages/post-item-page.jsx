import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api.js';

const postTypes = [
  { value: 'lost', label: 'Lost item' },
  { value: 'found', label: 'Found item' },
  { value: 'sale', label: 'Sell item' }
];

const categories = [
  { value: 'books', label: 'Books' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'cycles', label: 'Cycles' },
  { value: 'stationery', label: 'Stationery' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'other', label: 'Other' }
];

const locations = [
  { value: 'library', label: 'Library' },
  { value: 'hostel-block-a', label: 'Hostel Block A' },
  { value: 'hostel-block-b', label: 'Hostel Block B' },
  { value: 'canteen', label: 'Canteen' },
  { value: 'main-block', label: 'Main Block' },
  { value: 'sports-ground', label: 'Sports Ground' },
  { value: 'other', label: 'Other' }
];

const initialValues = {
  type: 'lost',
  title: '',
  description: '',
  category: 'books',
  location: 'library',
  price: '',
  imageUrl: ''
};

export function PostItemPage() {
  const { type: routeType } = useParams();
  const navigate = useNavigate();
  const hasRouteType = postTypes.some((type) => type.value === routeType);
  const defaultType = hasRouteType ? routeType : 'lost';
  const [formValues, setFormValues] = useState({ ...initialValues, type: defaultType });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!hasRouteType) {
      return;
    }

    setFormValues((current) => ({
      ...current,
      type: routeType,
      price: routeType === 'sale' ? current.price : ''
    }));
  }, [hasRouteType, routeType]);

  const selectedTypeLabel = useMemo(
    () => postTypes.find((type) => type.value === formValues.type)?.label ?? 'Post item',
    [formValues.type]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      type: formValues.type,
      title: formValues.title,
      description: formValues.description,
      category: formValues.category,
      location: formValues.location,
      images: formValues.imageUrl ? [formValues.imageUrl] : []
    };

    if (formValues.type === 'sale') {
      payload.price = Number(formValues.price);
    }

    try {
      await api.post('/listings', payload);
      toast.success('Item posted.');
      navigate('/browse');
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Could not post item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-campus">Create listing</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">{selectedTypeLabel}</h1>
        <p className="mt-3 max-w-2xl text-stone-700">
          Share enough detail for students to identify the item and arrange a safe campus handoff.
        </p>
        {hasRouteType ? (
          <Link to="/post" className="mt-3 inline-flex text-sm font-semibold text-campus hover:text-[#135a72]">
            Change listing type
          </Link>
        ) : null}
      </div>

      <form className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
        {!hasRouteType ? (
          <fieldset>
            <legend className="text-sm font-semibold text-stone-800">Listing type</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {postTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-semibold transition ${
                    formValues.type === type.value
                      ? 'border-campus bg-campus text-white'
                      : 'border-stone-300 text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formValues.type === type.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className={`${hasRouteType ? '' : 'mt-5'} grid gap-4`}>
          <label className="block" htmlFor="title">
            <span className="text-sm font-medium text-stone-800">Title</span>
            <input
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={120}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              placeholder="Blue Casio calculator"
            />
          </label>

          <label className="block" htmlFor="description">
            <span className="text-sm font-medium text-stone-800">Description</span>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={1200}
              rows={5}
              className="mt-2 w-full resize-y rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              placeholder="Add color, brand, where it was lost/found, and any identifying details."
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="category">
              <span className="text-sm font-medium text-stone-800">Category</span>
              <select
                id="category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                className="mt-2 min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block" htmlFor="location">
              <span className="text-sm font-medium text-stone-800">Campus location</span>
              <select
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                className="mt-2 min-h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              >
                {locations.map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {formValues.type === 'sale' ? (
            <label className="block" htmlFor="price">
              <span className="text-sm font-medium text-stone-800">Price</span>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={formValues.price}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
                placeholder="500"
              />
            </label>
          ) : null}

          <label className="block" htmlFor="imageUrl">
            <span className="text-sm font-medium text-stone-800">Image URL</span>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formValues.imageUrl}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-campus focus:ring-2 focus:ring-campus/20"
              placeholder="https://example.com/item-photo.jpg"
            />
            <span className="mt-2 block text-xs leading-5 text-stone-600">
              Direct phone uploads are next; for now you can paste an image URL or leave this blank.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 min-h-11 w-full rounded-md bg-campus px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#135a72] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Posting...' : 'Post item'}
        </button>
      </form>
    </section>
  );
}
