import { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 px-4 text-center">
          <h1 className="text-2xl font-black text-purple-800">Something went wrong</h1>
          <p className="mt-2 max-w-md text-sm text-slate-600">{this.state.error.message}</p>
          <Link to="/" className="btn-brand mt-6 px-6 py-3 text-sm">
            Go home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
