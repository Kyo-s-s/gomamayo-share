require 'test_helper'

class GomamayoCheckerTest < ActiveSupport::TestCase
  include GomamayoChecker

  test 'mecab parse' do
    assert mecab_parse('ホワイトとうもろこし') == [
      { surface: 'ホワイト', reading: 'ホワイト' },
      { surface: 'とうもろこし', reading: 'トウモロコシ' }
    ]
  end

  test 'gomamayo check success' do
    gomamayos = %w[
      ホワイトとうもろこし
      朝採れレタス
    ]
    gomamayos.each do |str|
      assert gomamayo?(str)
    end
  end

  test 'gomamayo check failure' do
    not_gomamayos = %w[
      はとぽっぽー
    ]
    not_gomamayos.each do |str|
      assert_not gomamayo?(str)
    end
  end
end
