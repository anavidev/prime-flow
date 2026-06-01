import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../services/apiFake';

const TopBrand = () => (
  <div className="flex flex-col items-center gap-3 relative z-10">
    <img src="/logo.svg" alt="PrimeFlow Logo" className="w-[44px] h-[44px]" />
    <span className="text-[22px] font-bold text-prime-preto tracking-tight">PrimeFlow</span>
  </div>
);

const PageFooter = () => (
  <div className="text-[12px] text-prime-preto-30 relative z-10">
    2026 PrimeFlow
  </div>
);

const AuthField = ({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  required,
  isPassword,
  showPassword,
  onTogglePassword,
  value,
  onChange,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 mb-[14px]">
      <label htmlFor={id} className="text-[11px] font-semibold text-prime-preto-50 uppercase tracking-wide">
        {label} {required && <span className="text-prime-danger">*</span>}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-[11px] pointer-events-none">
          <Icon className="w-4 h-4 text-prime-preto-30" strokeWidth={2.5} />
        </div>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-[40px] px-[38px] rounded-[8px] border-[1.5px] text-[14px] text-prime-preto outline-none transition-all duration-200
            ${isFocused
              ? 'bg-prime-white border-prime-azul shadow-[0_0_0_3px_var(--color-prime-azul-ring)]'
              : error ? 'bg-prime-white border-prime-danger shadow-[0_0_0_3px_var(--color-prime-danger-bg)]' : 'bg-prime-card-bg border-prime-branco-bord placeholder:text-prime-preto-30'
            }
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => onTogglePassword(id)}
            className="absolute right-[11px] text-prime-preto-30 hover:text-prime-azul transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" strokeWidth={2} /> : <Eye className="w-[18px] h-[18px]" strokeWidth={2} />}
          </button>
        )}
      </div>
      {error && <span className="text-[11px] text-prime-danger mt-1">{error}</span>}
    </div>
  );
};

const LoginPanel = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.id === 'login-user' ? 'identifier' : 'password']: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(credentials.identifier, credentials.password);
    if (res.success) {
      navigate('/');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="p-7 pb-[26px]">
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-prime-preto mb-1">Bem-vindo de volta</h2>
        <p className="text-[13px] text-prime-preto-50">Entre com seu e-mail ou usuário e senha.</p>
      </div>

      {errorMsg && (
        <div className="bg-prime-danger-bg border border-prime-danger/15 rounded-[8px] p-[11px_13px] text-[13px] text-prime-danger flex gap-2 items-center mb-5">
          <AlertCircle className="w-[15px] h-[15px] shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthField
          id="login-user"
          label="E-mail ou usuário"
          icon={User}
          placeholder="exemplo@email.com"
          value={credentials.identifier}
          onChange={handleChange}
          required
        />
        <AuthField
          id="login-pass"
          label="Senha"
          icon={Lock}
          placeholder="Sua senha"
          isPassword
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <div className="text-right -mt-[6px] mb-[14px]">
          <Link to="#" className="text-[12px] font-medium text-prime-azul hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-[42px] mt-5 bg-prime-azul hover:bg-prime-azul-hover text-prime-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          Entrar
        </button>

        <div className="mt-5 text-center text-[13px] text-prime-preto-50">
          Não tem conta? <button type="button" onClick={() => onSwitch('register')} className="font-semibold text-prime-azul hover:underline cursor-pointer">Criar conta</button>
        </div>
      </form>
    </div>
  );
};

const RegisterPanel = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [passwordsVisible, setPasswordsVisible] = useState({
    'register-pass': false,
    'register-confirm': false
  });
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const toggleVis = (id) => {
    setPasswordsVisible(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('register-', '');
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const errs = {};
    // Required fields
    if (!formData.name || !formData.name.trim()) errs.name = 'Campo obrigatório.';
    if (!formData.username || !formData.username.trim()) errs.username = 'Campo obrigatório.';
    if (!formData.email || !formData.email.trim()) errs.email = 'Campo obrigatório.';
    if (!formData.password) errs.password = 'Campo obrigatório.';
    if (!formData.confirm) errs.confirm = 'Campo obrigatório.';

    // Additional validations (only if provided)
    if (formData.password && formData.password.length < 8) {
      errs.password = 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (formData.password && formData.confirm && formData.password !== formData.confirm) {
      errs.confirm = 'As senhas não coincidem.';
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    const res = register({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

    if (res.success) {
      navigate('/');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="p-7 pb-[26px]">
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-prime-preto mb-1">Criar nova conta</h2>
        <p className="text-[13px] text-prime-preto-50">Preencha seus dados para acessar o PrimeFlow.</p>
      </div>

      {errorMsg && (
        <div className="bg-prime-danger-bg border border-prime-danger/15 rounded-[8px] p-[11px_13px] text-[13px] text-prime-danger flex gap-2 items-center mb-5">
          <AlertCircle className="w-[15px] h-[15px] shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <AuthField
            id="register-name"
            label="Nome completo"
            icon={User}
            placeholder="João Silva"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <AuthField
            id="register-username"
            label="Usuário"
            icon={User}
            placeholder="joaosilva"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <AuthField
          id="register-email"
          label="E-mail"
          type="email"
          icon={Mail}
          placeholder="joao@exemplo.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <AuthField
            id="register-password"
            label="Senha"
            icon={Lock}
            placeholder="mín. 8 chars"
            isPassword
            showPassword={passwordsVisible['register-password']}
            onTogglePassword={toggleVis}
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            required
          />
          <AuthField
            id="register-confirm"
            label="Confirmar senha"
            icon={Lock}
            placeholder="repita a senha"
            isPassword
            showPassword={passwordsVisible['register-confirm']}
            onTogglePassword={toggleVis}
            value={formData.confirm}
            onChange={handleChange}
            error={fieldErrors.confirm}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-[42px] mt-[6px] bg-prime-azul hover:bg-prime-azul-hover text-prime-white text-[15px] font-semibold rounded-[10px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          Criar conta
        </button>

        <div className="mt-5 text-center text-[13px] text-prime-preto-50">
          Já tem conta? <button type="button" onClick={() => onSwitch('login')} className="font-semibold text-prime-azul hover:underline cursor-pointer">Entrar</button>
        </div>
      </form>
    </div>
  );
};

const AuthCard = ({ activeTab, onSwitchTab }) => {
  return (
    <div className="w-110 bg-prime-white border border-prime-branco-bord rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.06)] relative z-10 overflow-hidden">
      <div className="grid grid-cols-2 border-b border-prime-branco-bord">
        <button
          onClick={() => onSwitchTab('login')}
          className={`h-12 text-[14px] font-semibold transition-all duration-150 cursor-pointer ${
            activeTab === 'login'
              ? 'text-prime-azul border-b-[2.5px] border-prime-azul -mb-px'
              : 'text-prime-preto-50 hover:text-prime-preto hover:bg-prime-card-bg/50'
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => onSwitchTab('register')}
          className={`h-12 text-[14px] font-semibold transition-all duration-150 cursor-pointer ${
            activeTab === 'register'
              ? 'text-prime-azul border-b-[2.5px] border-prime-azul -mb-px'
              : 'text-prime-preto-50 hover:text-prime-preto hover:bg-prime-card-bg/50'
          }`}
        >
          Criar conta
        </button>
      </div>

      {activeTab === 'login' ? (
        <LoginPanel onSwitch={onSwitchTab} />
      ) : (
        <RegisterPanel onSwitch={onSwitchTab} />
      )}
    </div>
  );
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen w-full bg-prime-board-bg flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(20, 161, 221, 0.1), transparent 50%),
            radial-gradient(circle at bottom right, rgba(17, 111, 152, 0.08), transparent 50%)
          `
        }}
      />

      <TopBrand />
      <AuthCard activeTab={activeTab} onSwitchTab={setActiveTab} />
      <PageFooter />
    </div>
  );
}
