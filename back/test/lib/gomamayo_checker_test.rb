require 'test_helper'

class GomamayoCheckerTest < ActiveSupport::TestCase
  include GomamayoChecker

  test 'mecab parse' do
    assert mecab_parse('ホワイトとうもろこし') == [
      ['ホワイト', '名詞', '一般', '*', '*', '*', '*', 'ホワイト', 'ホワイト', 'ホワイト'],
      ['とうもろこし', '名詞', '一般', '*', '*', '*', '*', 'とうもろこし', 'トウモロコシ', 'トウモロコシ']
    ]
  end
end
