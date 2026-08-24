import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/app-layout.jsx';
import { ProtectedRoute } from './components/protected-route.jsx';
import { BrowsePage } from './pages/browse-page.jsx';
import { HomePage } from './pages/home-page.jsx';
import { LoginPage } from './pages/login-page.jsx';
import { ListingDetailPage } from './pages/listing-detail-page.jsx';
import { MyListingsPage } from './pages/my-listings-page.jsx';
import { PostItemPage } from './pages/post-item-page.jsx';
import { ProfilePage } from './pages/profile-page.jsx';
import { SignupPage } from './pages/signup-page.jsx';
import { TermsPage } from './pages/terms-page.jsx';
import { VerifyEmailPage } from './pages/verify-email-page.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="browse" element={<BrowsePage />} />
        <Route path="listings/:id" element={<ListingDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route
          path="post"
          element={
            <ProtectedRoute>
              <PostItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="post/:type"
          element={
            <ProtectedRoute>
              <PostItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-listings"
          element={
            <ProtectedRoute>
              <MyListingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
