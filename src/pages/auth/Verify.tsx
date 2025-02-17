
import { Card } from "@/components/ui/card";

export default function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8 glass-card">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Check your email</h2>
          <p className="text-gray-600">
            We sent you a verification link. Please check your email and click the link to verify your account.
          </p>
        </div>
      </Card>
    </div>
  );
}
