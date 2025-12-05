import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const productFeatures = [
  {
    id: 1,
    title: 'Аналитика в реальном времени',
    description: 'Мгновенный доступ к ключевым метрикам и показателям эффективности вашего бизнеса',
    icon: 'TrendingUp',
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 2,
    title: 'Автоматизация процессов',
    description: 'Оптимизируйте рабочие процессы и сокращайте время на рутинные операции до 70%',
    icon: 'Zap',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Интеграция с системами',
    description: 'Бесшовная интеграция с CRM, ERP и другими корпоративными решениями',
    icon: 'Network',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    id: 4,
    title: 'Безопасность данных',
    description: 'Банковский уровень шифрования и соответствие международным стандартам защиты',
    icon: 'Shield',
    color: 'from-teal-500 to-green-500'
  }
];

export default function Index() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const sceneInterval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % productFeatures.length);
      setProgress(0);
    }, 8000);

    return () => clearInterval(sceneInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 800);
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

  const currentFeature = productFeatures[currentScene];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Инновационное решение
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            для роста вашего бизнеса
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div 
            key={currentScene} 
            className="animate-fade-in aspect-video bg-gradient-to-br rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, ${currentFeature.color.split(' ')[1]} 0%, ${currentFeature.color.split(' ')[3]} 100%)`
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center p-8">
              <div className="mb-6 inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full">
                <Icon name={currentFeature.icon} size={64} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {currentFeature.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto">
                {currentFeature.description}
              </p>
            </div>
          </div>

          <div className="space-y-8 animate-scale-in">
            <div>
              <h3 className="text-3xl font-semibold mb-4">Возможности продукта</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Откройте новые горизонты эффективности с нашим комплексным решением для корпоративного сектора
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {productFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => handleSceneChange(index)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                    currentScene === index
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border bg-card/50 hover:border-primary/50'
                  }`}
                >
                  <Icon name={feature.icon} size={32} className={currentScene === index ? 'text-primary' : 'text-muted-foreground'} />
                  <h4 className="font-semibold mt-2 text-sm">
                    {feature.title}
                  </h4>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePlayPause}
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                >
                  <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
                </Button>
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  {currentScene + 1} / {productFeatures.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="animate-slide-up">
          <h3 className="text-3xl font-semibold text-center mb-8">Преимущества партнёрства</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105">
              <Icon name="Users" size={48} className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Поддержка 24/7</h4>
              <p className="text-muted-foreground">
                Выделенная команда экспертов для решения любых вопросов в режиме реального времени
              </p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105">
              <Icon name="Rocket" size={48} className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Быстрый запуск</h4>
              <p className="text-muted-foreground">
                Внедрение за 14 дней с полным обучением команды и технической документацией
              </p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 hover:scale-105">
              <Icon name="BarChart" size={48} className="text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">ROI +300%</h4>
              <p className="text-muted-foreground">
                Средний рост эффективности наших клиентов в первый год использования платформы
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-16 text-center animate-fade-in">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm border border-primary/30">
            <h3 className="text-3xl font-semibold mb-4">Готовы к сотрудничеству?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Присоединяйтесь к 500+ компаниям, которые уже трансформировали свой бизнес
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50">
                <Icon name="Calendar" size={20} className="mr-2" />
                Запланировать демо
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Icon name="FileText" size={20} className="mr-2" />
                Скачать презентацию
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
