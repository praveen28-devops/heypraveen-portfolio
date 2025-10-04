import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					light: 'hsl(var(--primary-light))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					elevated: 'hsl(var(--secondary-elevated))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))',
					soft: 'hsl(var(--accent-soft))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					glass: 'hsl(var(--card-glass))',
					elevated: 'hsl(var(--card-elevated))'
				},
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					elevated: 'hsl(var(--surface-elevated))',
					glass: 'hsl(var(--surface-glass))'
				},
				highlight: {
					blue: 'hsl(var(--highlight-blue))',
					teal: 'hsl(var(--highlight-teal))',
					gray: 'hsl(var(--highlight-gray))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'slideInLeft': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slideInRight': {
					'0%': {
						opacity: '0',
						transform: 'translateX(100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slideInUp': {
					'0%': {
						opacity: '0',
						transform: 'translateY(100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fadeInScale': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				// Mobile-specific animations
				'mobileSlideIn': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) scale(1)'
					}
				},
				'mobileFadeUp': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'mobileOverlayIn': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'mobileDrawerSlide': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'mobileSectionFade': {
					'0%': {
						opacity: '0',
						transform: 'translateY(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'mobileStaggerFade': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px) scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'mobileHeroSlide': {
					'0%': {
						opacity: '0',
						transform: 'translateY(60px) scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'mobileHeroTitle': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px) scale(0.95)',
						filter: 'blur(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'mobileHeroSubtitle': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)',
						filter: 'blur(5px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
						filter: 'blur(0px)'
					}
				},
				'mobilePulse': {
					'0%, 100%': {
						opacity: '0.6',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.05)'
					}
				},
				'mobileShimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				// Advanced mobile scroll animations
				'mobileScrollReveal': {
					'0%': {
						opacity: '0',
						transform: 'translateY(60px) scale(0.9)',
						filter: 'blur(8px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'mobileSlideInFromLeft': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-80px) rotateY(-15deg)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) rotateY(0deg)'
					}
				},
				'mobileSlideInFromRight': {
					'0%': {
						opacity: '0',
						transform: 'translateX(80px) rotateY(15deg)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0) rotateY(0deg)'
					}
				},
				'mobileZoomIn': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.7) rotate(-5deg)',
						filter: 'blur(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) rotate(0deg)',
						filter: 'blur(0px)'
					}
				},
				'mobileFloatUp': {
					'0%': {
						opacity: '0',
						transform: 'translateY(100px) scale(0.8)',
						filter: 'blur(6px)'
					},
					'60%': {
						opacity: '0.8',
						transform: 'translateY(-10px) scale(1.02)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'mobileCardFlip': {
					'0%': {
						opacity: '0',
						transform: 'perspective(1000px) rotateX(-90deg) translateZ(-50px)'
					},
					'50%': {
						opacity: '0.5',
						transform: 'perspective(1000px) rotateX(-45deg) translateZ(-25px)'
					},
					'100%': {
						opacity: '1',
						transform: 'perspective(1000px) rotateX(0deg) translateZ(0px)'
					}
				},
				'mobileWaveIn': {
					'0%': {
						opacity: '0',
						transform: 'translateY(50px) skewX(-10deg)'
					},
					'50%': {
						transform: 'translateY(-5px) skewX(5deg)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) skewX(0deg)'
					}
				},
				'mobileGlowPulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
						transform: 'scale(1.02)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'slide-in-up': 'slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'fade-in-scale': 'fadeInScale 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
				// Mobile animations
				'mobile-slide-in': 'mobileSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-fade-up': 'mobileFadeUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-overlay-in': 'mobileOverlayIn 0.3s ease-out',
				'mobile-drawer-slide': 'mobileDrawerSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-section-fade': 'mobileSectionFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'mobile-stagger-fade': 'mobileStaggerFade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-hero-slide': 'mobileHeroSlide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'mobile-hero-title': 'mobileHeroTitle 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-hero-subtitle': 'mobileHeroSubtitle 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-pulse': 'mobilePulse 1.5s ease-in-out infinite',
				'mobile-shimmer': 'mobileShimmer 1.5s ease-in-out infinite',
				// Advanced mobile scroll animations
				'mobile-scroll-reveal': 'mobileScrollReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'mobile-slide-left': 'mobileSlideInFromLeft 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-slide-right': 'mobileSlideInFromRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-zoom-in': 'mobileZoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-float-up': 'mobileFloatUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'mobile-card-flip': 'mobileCardFlip 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'mobile-wave-in': 'mobileWaveIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'mobile-glow-pulse': 'mobileGlowPulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
