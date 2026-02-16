import { useState, useEffect } from 'react';
import { Lock, ArrowRight, Clock, HelpCircle, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function App() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 4, seconds: 54 });
  const [quantity, setQuantity] = useState('1');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    celular: ''
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* TikTok Shop Logo */}
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="black"/>
              </svg>
              <span className="text-xl font-bold tracking-tight">TikTok Shop</span>
            </div>

            {/* Secure Payment Badge */}
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4" />
              <div className="text-right">
                <p className="font-semibold text-xs">PAGAMENTO</p>
                <p className="text-xs text-gray-600">100% SEGURO</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>Promoção Válida somente uma compra por CPF.</p>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Personal Data */}
          <div className="space-y-4">
            {/* Personal Data Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-1">Dados pessoais</h2>
              <p className="text-sm text-gray-500 mb-6">
                Pedimos apenas as informações essenciais para concluir sua compra com segurança.
              </p>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome completo
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Mariana Cardoso Silva"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="h-11 border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ex: marianacardoso@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-11 border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                {/* CPF */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="cpf" className="text-sm font-medium">
                      CPF
                    </Label>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                    maxLength={14}
                    className="h-11 border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="celular" className="text-sm font-medium">
                    Celular/Whatsapp
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      +55
                    </span>
                    <Input
                      id="celular"
                      placeholder="(00) 00000-0000"
                      value={formData.celular}
                      onChange={(e) => handleInputChange('celular', formatPhone(e.target.value))}
                      maxLength={15}
                      className="h-11 pl-12 border-gray-300 focus:border-black focus:ring-black"
                    />
                  </div>
                </div>

                {/* Continue Button */}
                <Button 
                  className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold mt-4"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Delivery Card (Disabled) */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 opacity-60">
              <h2 className="text-lg font-semibold text-gray-400 mb-1">Entrega</h2>
              <p className="text-sm text-gray-400">
                Preencha suas informações pessoais para continuar
              </p>
            </div>
          </div>

          {/* Middle Column - Payment Option */}
          <div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 opacity-60">
              <h2 className="text-lg font-semibold text-gray-400 mb-1">Opção de pagamento</h2>
              <p className="text-sm text-gray-400 mb-6">
                Preencha suas informações de entrega para continuar
              </p>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-400">Tipo de Pagamento</p>
                
                {/* PIX Option */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#32BCAD] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">PIX</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">PIX</p>
                        <p className="text-xs text-gray-500">APROVAÇÃO IMEDIATA</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#32BCAD] font-bold text-lg">5%</p>
                      <p className="text-xs text-gray-500">DE DESCONTO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">R$ 39,90</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-bold">R$ 39,90</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="bg-black text-white rounded-lg p-3 mb-4 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Oferta termina em</span>
                <span className="text-red-500 font-mono font-bold">
                  {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
              </div>

              {/* Product */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex gap-4">
                  <img
                    src="/jbl-speaker.png"
                    alt="JBL PartyBox Stage 320BR"
                    className="w-24 h-32 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1">JBL PartyBox Stage 320BR</h3>
                    <p className="text-lg font-bold mb-2">R$ 39,90</p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Quantidade</span>
                      <Select value={quantity} onValueChange={setQuantity}>
                        <SelectTrigger className="w-16 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-end gap-2 mb-4">
            <Shield className="w-5 h-5" />
            <div className="text-right">
              <p className="font-semibold text-sm">PAGAMENTO</p>
              <p className="text-xs text-gray-600">100% SEGURO</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">
            Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
