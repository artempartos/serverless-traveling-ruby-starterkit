require 'bundler'
# For Bundler.with_clean_env
require 'bundler/setup'

PACKAGE_NAME = "hello"
VERSION = "1.0.0"
TRAVELING_RUBY_VERSION = "20150204-2.1.5"
NOKOGIRI_VERSION = "1.6.6.2"  # Must match Gemfile

desc "Package your app"
task :package => ['package:linux:x86', 'package:linux:x86_64', 'package:osx']

namespace :package do
  namespace :linux do
    desc "Package your app for Linux x86"
    task :x86 => [:bundle_install,
      "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86.tar.gz",
      "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86-nokogiri-#{NOKOGIRI_VERSION}.tar.gz"
    ] do
      create_package("linux-x86")
    end

    desc "Package your app for Linux x86_64"
    task :x86_64 => [:bundle_install,
      "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86_64.tar.gz",
      "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86_64-nokogiri-#{NOKOGIRI_VERSION}.tar.gz"
    ] do
      create_package("linux-x86_64")
    end
  end

  desc "Package your app for OS X"
  task :osx => [:bundle_install,
    "traveling-ruby-#{TRAVELING_RUBY_VERSION}-osx.tar.gz",
    "traveling-ruby-#{TRAVELING_RUBY_VERSION}-osx-nokogiri-#{NOKOGIRI_VERSION}.tar.gz"
  ] do
    create_package("osx")
  end

  desc "Install gems to local directory"
  task :bundle_install do
    if RUBY_VERSION !~ /^2\.1\./
      abort "You can only 'bundle install' using Ruby 2.1, because that's what Traveling Ruby uses."
    end
    sh "rm -rf tmp"
    sh "mkdir tmp"
    sh "cp app/Gemfile app/Gemfile.lock tmp/"

    Bundler.with_clean_env do
      sh "cd tmp && env BUNDLE_IGNORE_CONFIG=1 bundle install --path ../vendor --without development"
    end

    sh "rm -rf tmp"
    sh "rm -f vendor/*/*/cache/*"
    sh "rm -rf vendor/ruby/*/extensions"
    sh "find vendor/ruby/*/gems -name '*.so' | xargs rm -f"
    sh "find vendor/ruby/*/gems -name '*.bundle' | xargs rm -f"
    sh "find vendor/ruby/*/gems -name '*.o' | xargs rm -f"
  end
end

file "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86.tar.gz" do
  download_runtime("linux-x86")
end

file "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86_64.tar.gz" do
  download_runtime("linux-x86_64")
end

file "traveling-ruby-#{TRAVELING_RUBY_VERSION}-osx.tar.gz" do
  download_runtime("osx")
end

file "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86-nokogiri-#{NOKOGIRI_VERSION}.tar.gz" do
  download_native_extension("linux-x86", "nokogiri-#{NOKOGIRI_VERSION}")
end

file "traveling-ruby-#{TRAVELING_RUBY_VERSION}-linux-x86_64-nokogiri-#{NOKOGIRI_VERSION}.tar.gz" do
  download_native_extension("linux-x86_64", "nokogiri-#{NOKOGIRI_VERSION}")
end

file "traveling-ruby-#{TRAVELING_RUBY_VERSION}-osx-nokogiri-#{NOKOGIRI_VERSION}.tar.gz" do
  download_native_extension("osx", "nokogiri-#{NOKOGIRI_VERSION}")
end

def create_package(target)
  sh "rm -rf lib/app"
  sh "rm -rf lib/ruby"
  sh "rm -rf lib/vendor"
  sh "cp -r app lib/"
  sh "mkdir lib/ruby"
  sh "mkdir lib/vendor"
  sh "tar -xzf traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}.tar.gz -C lib/ruby"
  sh "rm traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}.tar.gz"
  sh "mv vendor lib"
  sh "cp app/Gemfile app/Gemfile.lock lib/vendor/"
  sh "mkdir lib/vendor/.bundle"
  sh "cp bundler-config lib/vendor/.bundle/config"
  sh "tar -xzf traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}-nokogiri-#{NOKOGIRI_VERSION}.tar.gz " +
    "-C lib/vendor/ruby"
  sh "rm traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}-nokogiri-#{NOKOGIRI_VERSION}.tar.gz"
end

def download_runtime(target)
  sh "curl -L -O --fail " +
    "http://d6r77u77i8pq3.cloudfront.net/releases/traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}.tar.gz"
end

def download_native_extension(target, gem_name_and_version)
  sh "curl -L --fail -o traveling-ruby-#{TRAVELING_RUBY_VERSION}-#{target}-#{gem_name_and_version}.tar.gz " +
    "http://d6r77u77i8pq3.cloudfront.net/releases/traveling-ruby-gems-#{TRAVELING_RUBY_VERSION}-#{target}/#{gem_name_and_version}.tar.gz"
end
