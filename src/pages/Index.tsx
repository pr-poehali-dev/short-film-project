import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const beautyFeatures = [
  {
    id: 1,
    title: 'Глубокое увлажнение',
    description: 'Интенсивная формула с гиалуроновой кислотой проникает в глубокие слои кожи',
    icon: 'Droplets',
    gradient: 'from-blue-200 via-cyan-200 to-teal-200',
    accent: 'bg-cyan-400'
  },
  {
    id: 2,
    title: 'Сияние молодости',
    description: 'Витамин С и антиоксиданты возвращают коже естественное сияние и упругость',
    icon: 'Sparkles',
    gradient: 'from-amber-200 via-yellow-200 to-orange-200',
    accent: 'bg-amber-400'
  },
  {
    id: 3,
    title: 'Нежная текстура',
    description: 'Легкая кремовая текстура мгновенно впитывается, не оставляя жирного блеска',
    icon: 'Heart',
    gradient: 'from-pink-200 via-rose-200 to-red-200',
    accent: 'bg-rose-400'
  },
  {
    id: 4,
    title: 'Защита 24/7',
    description: 'SPF 30 и натуральные экстракты защищают кожу от внешних воздействий весь день',
    icon: 'Shield',
    gradient: 'from-purple-200 via-violet-200 to-fuchsia-200',
    accent: 'bg-purple-400'
  }
];

export default function Index() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % beautyFeatures.length);
      setProgress(0);
    }, 6000);

    return () => clearInterval(sceneInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 600);
      });
    }, 10);

    return () => clearInterval(progressInterval);
  }, [isPlaying, currentScene]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSceneChange = (index: number) => {
    setCurrentScene(index);
    setProgress(0);
  };

  const currentFeature = beautyFeatures[currentScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-peach-50 text-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-300 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Flower" size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">
            Luminous Glow
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light italic">
            Красота, которую вы чувствуете
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div 
            key={currentScene} 
            className="relative animate-scale-in"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-orange-200/50 blur-3xl rounded-full"></div>
            <div className={`relative aspect-square bg-gradient-to-br ${currentFeature.gradient} rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10 text-center p-12">
                <div className="mb-8 inline-block">
                  <div className="p-8 bg-white/30 backdrop-blur-md rounded-full shadow-xl">
                    <Icon name={currentFeature.icon} size={80} className="text-white drop-shadow-lg" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
                  {currentFeature.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/95 max-w-md mx-auto leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10 animate-fade-in">
            <div>
              <h3 className="text-4xl font-semibold mb-4 text-foreground">Секрет сияющей кожи</h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Инновационная формула, созданная с любовью к вашей коже. 
                Каждый ингредиент тщательно отобран для максимального эффекта.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {beautyFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => handleSceneChange(index)}
                  className={`group p-6 rounded-2xl border-2 transition-all duration-500 text-left ${
                    currentScene === index
                      ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50 shadow-xl scale-105'
                      : 'border-border bg-white hover:border-pink-200 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                    currentScene === index ? currentFeature.accent : 'bg-gray-100 group-hover:bg-pink-100'
                  }`}>
                    <Icon 
                      name={feature.icon} 
                      size={24} 
                      className={currentScene === index ? 'text-white' : 'text-muted-foreground group-hover:text-pink-400'} 
                    />
                  </div>
                  <h4 className={`font-semibold text-base transition-colors ${
                    currentScene === index ? 'text-pink-600' : 'text-foreground'
                  }`}>
                    {feature.title}
                  </h4>
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-6">
                <Button
                  onClick={handlePlayPause}
                  size="icon"
                  className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 shadow-lg"
                >
                  <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} className="text-white" />
                </Button>
                <div className="flex-1">
                  <div className="h-3 bg-pink-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 transition-all duration-100 shadow-lg"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-base text-muted-foreground font-medium min-w-[3rem] text-right">
                  {currentScene + 1} / {beautyFeatures.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-20 animate-slide-up">
          <h3 className="text-4xl font-semibold text-center mb-12 text-foreground">Почему нас выбирают</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 flex items-center justify-center mb-6 shadow-lg">
                <Icon name="Leaf" size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-semibold mb-3 text-foreground">100% натурально</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Только природные ингредиенты высочайшего качества без парабенов и силиконов
              </p>
            </Card>
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 flex items-center justify-center mb-6 shadow-lg">
                <Icon name="TestTube" size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-semibold mb-3 text-foreground">Протестировано</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Дерматологически одобрено и проверено на всех типах кожи
              </p>
            </Card>
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center mb-6 shadow-lg">
                <Icon name="Award" size={32} className="text-white" />
              </div>
              <h4 className="text-2xl font-semibold mb-3 text-foreground">№1 в мире</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Признано лучшим средством по уходу за кожей по версии Beauty Awards 2024
              </p>
            </Card>
          </div>
        </section>

        <section className="text-center animate-fade-in">
          <div className="inline-block p-12 rounded-3xl bg-gradient-to-br from-pink-100/80 via-rose-100/80 to-orange-100/80 backdrop-blur-sm border-2 border-pink-200 shadow-2xl">
            <h3 className="text-4xl font-semibold mb-6 text-foreground">Попробуйте сегодня</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Специальное предложение: скидка 30% на первый заказ + бесплатная доставка
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 rounded-full"
              >
                <Icon name="ShoppingBag" size={24} className="mr-2" />
                Купить сейчас
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 text-lg px-8 py-6 rounded-full hover:scale-105 transition-all duration-300"
              >
                <Icon name="Info" size={24} className="mr-2" />
                Узнать больше
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
