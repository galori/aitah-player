class Retry

  module Defaults
    MAX_RETRIES = 10
    BASE_DELAY = 6
    EXTRA_DELAY = 10
    EXPONENTIAL_MULTIPLIER = 1.1
    OVERALL_MULTIPLIER = 1.1
  end

  def initialize(max_retries:nil, base_delay:nil, extra_delay:nil, delay_multiplier:nil, overall_multiplier:nil)
    @max_retries = max_retries || Defaults::MAX_RETRIES
    @base_delay = base_delay || Defaults::BASE_DELAY
    @extra_delay = extra_delay || Defaults::EXTRA_DELAY
    @exponential_multiplier = delay_multiplier || Defaults::EXPONENTIAL_MULTIPLIER
    @overall_multiplier = overall_multiplier || Defaults::OVERALL_MULTIPLIER
  end

  def backoff
    retries = 0

    begin
      yield
    rescue => e
      raise e unless e.class.name =~ /ratelimit|throttl|toomanyrequests|transmission/i

      puts "Retry.backoff retrying for #{caller[1]}: #{e.message}"

      if retries <= max_retries
        retries += 1
        sleep_time = (base_delay + exponential_multiplier ** retries + rand(extra_delay)) * overall_multiplier
        puts "sleeping for #{sleep_time}s and retrying"
        sleep sleep_time
        retry
      else raise "Giving up on the server after #{retries} retries. Got error: #{e.message}"
      end

    rescue StandardError => e
      puts "Retry.backoff got error: #{e.class} #{e.inspect} #{e.message} - not retrying"
      puts e.backtrace.reject { |e| e =~ /\.rbenv/ }[0]
    end
  end

  private

  attr_reader :max_retries, :base_delay, :extra_delay, :exponential_multiplier, :overall_multiplier
end

