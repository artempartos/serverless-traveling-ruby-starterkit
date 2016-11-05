require 'bundler'
# For Bundler.with_clean_env
require 'bundler/setup'

PACKAGE_NAME = "hello"
VERSION = "1.0.0"
TRAVELING_RUBY_VERSION = "20150204-2.1.5"
NOKOGIRI_VERSION = "1.6.6.2"  # Must match Gemfile

desc "Package your app"
task :package => ['package:linux:x86_64']

namespace :package do
  namespace :linux do
    desc "Package your app for Linux x86_64"
    task :x86_64 do
      if RUBY_VERSION !~ /^2\.1\./
        abort "You can only 'bundle install' using Ruby 2.1, because that's what Traveling Ruby uses."
      end

      tmpdir = %x(mktemp -d -q).chomp # FreeBSD may need "-t" flag
      sh "cp app/Gemfile app/Gemfile.lock #{tmpdir}/"

      sh "rm -rf ruby-lib"
      sh "mkdir ruby-lib/"
      sh "cp -r app ruby-lib/"
      sh "rm -rf ruby-lib/app/vendor/bundle ruby-lib/app/.bundle"

      # bundle_install
      Bundler.with_clean_env do
        puts __dir__
        sh "cd #{tmpdir} && env BUNDLE_IGNORE_CONFIG=1 bundle install --path #{__dir__}/ruby-lib/app/vendor/bundle --without development"
      end

      sh "rm -f ruby-lib/app/vendor/bundle/*/*/cache/*"
      sh "rm -rf ruby-lib/app/vendor/bundle/ruby/*/extensions"
      sh "find ruby-lib/app/vendor/bundle/ruby/*/gems -name '*.so' | xargs rm -f"
      sh "find ruby-lib/app/vendor/bundle/ruby/*/gems -name '*.bundle' | xargs rm -f"
      sh "find ruby-lib/app/vendor/bundle/ruby/*/gems -name '*.o' | xargs rm -f"

      target = "linux-x86_64"
      # download
      sh "curl -L -O --fail " +
        "http://d6r77u77i8pq3.cloudfront.net/releases/traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}.tar.gz"
      gem_name_and_version = "nokogiri-#{NOKOGIRI_VERSION}"
      sh "curl -L --fail -o traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}-#{gem_name_and_version}.tar.gz " +
        "http://d6r77u77i8pq3.cloudfront.net/releases/traveling-ruby-gems-#{TRAVELING_RUBY_VERSION}-#{target}/#{gem_name_and_version}.tar.gz"

      sh "mkdir ruby-lib/ruby"
      sh "tar -xzf traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}.tar.gz -C ruby-lib/ruby"
      sh "rm traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}.tar.gz"
      sh "mkdir ruby-lib/app/.bundle"
      sh "echo 'BUNDLE_PATH: ./vendor/bundle\nBUNDLE_WITHOUT: development\nBUNDLE_DISABLE_SHARED_GEMS: '1'' > ruby-lib/app/.bundle/config"
      sh "tar -xzf traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}-nokogiri-#{NOKOGIRI_VERSION}.tar.gz -C ruby-lib/app/vendor/bundle/ruby"
      sh "rm traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}-nokogiri-#{NOKOGIRI_VERSION}.tar.gz"
    end
  end
end

desc "Integration Test"
task :test do
  expected = File.read(__dir__ + '/integration-test/expected_output')
  actual = %x(serverless run -f hello)

  puts '------expected output------'
  puts expected
  puts '------actual output------'
  puts actual

  if expected == actual
    puts 'test success!'
    exit 0
  else
    puts 'test failed!'
    exit 1
  end
end
