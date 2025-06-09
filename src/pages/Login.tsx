import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Leaf, Sprout } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface LoginProps {
  onLogin: () => void;
  showSignUp?: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, showSignUp }) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const checkUsername = async (username: string) => {
    if (!username) {
      setUsernameError('Username is required');
      return false;
    }

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return false;
    }

    setIsCheckingUsername(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    setIsCheckingUsername(false);

    if (error && error.code !== 'PGRST116') {
      setUsernameError('Error checking username availability');
      return false;
    }

    if (data) {
      setUsernameError('Username is already taken');
      return false;
    }

    setUsernameError('');
    return true;
  };

  const handleSignUp = async (event: any) => {
    if (event.type === 'SIGNED_UP') {
      const isValid = await checkUsername(username);
      if (!isValid) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen">
        {/* Left Side - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 relative p-12">
          <div className="relative z-10 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center">
                <Leaf className="h-12 w-12 text-green-400" />
                <h1 className="text-4xl font-bold text-white ml-4">PlantSmart</h1>
              </div>
              <p className="mt-6 text-xl text-green-100">Seu assistente inteligente para cuidados com plantas</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-400/10 rounded-lg">
                  <Sprout className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Monitoramento Inteligente</h3>
                  <p className="text-green-100/80">Acompanhe a saúde das suas plantas em tempo real</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-400/10 rounded-lg">
                  <Leaf className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Lembretes Personalizados</h3>
                  <p className="text-green-100/80">Nunca mais esqueça de regar suas plantas</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-green-100/60">
              © 2025 PlantSmart. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">PlantSmart</h1>
              <p className="text-green-100 mt-2">Seu assistente inteligente para cuidados com plantas</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#22c55e',
                        brandAccent: '#16a34a',
                        brandButtonText: 'white',
                        defaultButtonBackground: 'white',
                        defaultButtonBackgroundHover: '#f9fafb',
                        inputBackground: 'white',
                        inputBorder: 'transparent',
                        inputBorderHover: '#22c55e',
                        inputBorderFocus: '#22c55e',
                      },
                      space: {
                        inputPadding: '12px',
                        buttonPadding: '12px',
                      },
                      borderWidths: {
                        buttonBorderWidth: '0px',
                        inputBorderWidth: '1px',
                      },
                      radii: {
                        borderRadiusButton: '8px',
                        buttonBorderRadius: '8px',
                        inputBorderRadius: '8px',
                      },
                    },
                  },
                  className: {
                    container: 'text-white',
                    label: 'text-green-100',
                    button: 'bg-green-500 hover:bg-green-600 text-white font-medium shadow-lg shadow-green-500/25 transition-all duration-150',
                    input: 'bg-white/10 border-white/20 text-white placeholder-white/50',
                    anchor: 'text-green-400 hover:text-green-300',
                  },
                  extendedStyles: {
                    container: {
                      input: {
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      },
                    },
                  },
                }}
                providers={['google']}
                redirectTo={window.location.origin}
                view={showSignUp ? 'sign_up' : 'sign_in'}
                socialLayout="horizontal"
                onAuthStateChange={handleSignUp}
                localization={{
                  variables: {
                    sign_up: {
                      email_label: 'Email',
                      password_label: 'Password',
                      email_input_placeholder: 'Your email',
                      password_input_placeholder: 'Your password',
                      button_label: 'Continue',
                      loading_button_label: 'Creating account...',
                      social_provider_text: 'Sign up with {{provider}}',
                      link_text: 'Don\'t have an account? Sign up',
                      confirmation_text: 'Check your email for the confirmation link',
                    },
                  },
                }}
                {...(showSignUp && {
                  extendedFormFields: {
                    username: {
                      type: 'text',
                      key: 'username',
                      name: 'username',
                      label: 'Username',
                      placeholder: 'Choose a username',
                      value: username,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                        if (e.target.value) checkUsername(e.target.value);
                      },
                      validate: async (value: string) => {
                        const isValid = await checkUsername(value);
                        return isValid ? null : usernameError;
                      },
                    },
                  },
                })}
              />
              {showSignUp && usernameError && (
                <p className="mt-2 text-sm text-red-400">{usernameError}</p>
              )}
              {showSignUp && isCheckingUsername && (
                <p className="mt-2 text-sm text-green-400">Checking username availability...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;