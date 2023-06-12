import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import NavBarHome from "./NavBarHome";
import { Authenticator, useAuthenticator, View, ThemeProvider, useTheme, Image, Text, Heading, Button } from "@aws-amplify/ui-react";

import logo from "../assests/DarkLogo.png";
import "@aws-amplify/ui-react/styles.css";
import "./Login.css";

function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  var from = (location.state && location.state.from && location.state.from.pathname) || "/owner";

  useEffect(() => {
    if (route === "authenticated") {
      console.log("redirecting");
      navigate(-1);
    }
  }, [route, navigate, from]);

  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image src={logo} alt="logo" className="logoLogin" />
        </View>
      );
    },

    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]} fontSize={15}>
            <nobr className="fw-bold">Note:</nobr> Your username will be used as the URL of your page.
          </Text>
        </View>
      );
    },

    SignIn: {
      Header() {
        const { tokens } = useTheme();

        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        );
      },
      Footer() {
        const { toResetPassword } = useAuthenticator();

        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toResetPassword}
              size="small"
              variation="link"
              color="black"
            >
              Reset Password
            </Button>
          </View>
        );
      },
    },

    SignUp: {
      Header() {
        const { tokens } = useTheme();

        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a new account
          </Heading>
        );
      },
      Footer() {
        const { toSignIn } = useAuthenticator();

        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toSignIn}
              size="small"
              variation="link"
              color="black"
            >
              Back to Sign In
            </Button>
          </View>
        );
      },
    },

    ConfirmSignUp: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      
    },

    SetupTOTP: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      
    },

    ConfirmSignIn: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      
    },

    ResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      
    },

    ConfirmResetPassword: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      
    },
  };

  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your email',
      },
    },
    signUp: {
      password: {
        label: 'Password:',
        placeholder: 'Enter your Password:',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        label: 'Confirm Password:',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Enter your Password:',
      },
    },
    resetPassword: {
      username: {
        placeholder: 'Enter your email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Enter your Password Please:',
      },
    },
    setupTOTP: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };

  const { tokens } = useTheme();
  const theme = {
    name: 'Auth Example Theme',
    tokens: {
      colors: {
        // background: {
        //   primary: {
        //     value: tokens.colors.neutral['90'].value,
        //   },
        //   secondary: {
        //     value: tokens.colors.neutral['100'].value,
        //   },
        // },
        font: {
          interactive: {
            value: tokens.colors.black.value,
          },
        },
        // brand: {
          // primary: {
          //   '10': tokens.colors.teal['100'],
          //   '80': tokens.colors.teal['40'],
            // '90': tokens.colors.teal['20'],
            // '100': tokens.colors.teal['10'],
          // },
        // },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.black.value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.yellow['80'].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.black.value,
              },
            },
          },
        },
      },
    },
  };

  return (
    <>
    <NavBarHome/>
    <br></br>
    <View className="auth-wrapper">
      <ThemeProvider theme={theme}>
      {/* Sign-in box */}
      <Authenticator formFields={formFields} components={components}>
      </Authenticator>
      </ThemeProvider>
    </View>
    </>
  );
}

export default Login;
