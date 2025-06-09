import React from 'react';

type HealthIndicatorProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
};

const HealthIndicator: React.FC<HealthIndicatorProps> = ({ 
  score, 
  size = 'md',
  showText = true 
}) => {
  const getColor = () => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getText = () => {
    if (score >= 80) return 'Saudável';
    if (score >= 60) return 'Precisa de Atenção';
    return 'Crítico';
  };

  const sizeClasses = {
    sm: 'w-16 h-2',
    md: 'w-24 h-3',
    lg: 'w-32 h-4',
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <div className={`${sizeClasses[size]} bg-gray-200 rounded-full overflow-hidden`}>
          <div 
            className={`h-full rounded-full ${getColor()}`} 
            style={{ width: `${score}%` }}
          />
        </div>
        {showText && (
          <span className="text-sm font-medium text-gray-700">
            {score}%
          </span>
        )}
      </div>
      {showText && (
        <span className="text-xs text-gray-500 mt-1">
          {getText()}
        </span>
      )}
    </div>
  );
};

export default HealthIndicator;