# Provides the presenter / decorate pattern
#
# Usage:
#   decorated_system = System.first.decorate
#
# If we ever want multiple presenter flavors it can just be called explicitly (instead of .decorate)
#
#   uniquely_decorated_system = UniqueSystemPresenter.new(System.first)
module Presentable
  def decorate
    "#{self.class}Presenter".constantize.new(self)
  end

  # add a class method named "decorate" that takes an array of objects and decorates each one
  # e.g. System.decorate(systems)
  def self.included(base)
    base.extend(ClassMethods)
  end

  # Add class level method
  module ClassMethods
    def decorate(collection)
      collection.map(&:decorate)
    end
  end
end
