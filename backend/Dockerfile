FROM php:8.4-cli-alpine

RUN apk add --no-cache \
    git \
    unzip \
    icu-dev \
    libzip-dev \
    sqlite \
    sqlite-dev \
    oniguruma-dev \
  && docker-php-ext-install \
    pdo \
    pdo_sqlite \
    intl \
    zip \
    bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-scripts --no-progress --prefer-dist

COPY . .
RUN composer dump-autoload --optimize \
  && mkdir -p database storage/framework/{cache,sessions,views} bootstrap/cache \
  && touch database/database.sqlite \
  && chmod -R 775 storage bootstrap/cache database

EXPOSE 8000

CMD ["sh", "-c", "php artisan migrate --graceful --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=8000"]
