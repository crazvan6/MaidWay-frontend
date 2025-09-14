import { Redirect } from 'expo-router';

export default function Index() {
  // Immediately redirect to auth/login
  return <Redirect href="/auth" />;
}
