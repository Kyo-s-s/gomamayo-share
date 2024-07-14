require 'test_helper'

class GomamayoCheckerTest < ActiveSupport::TestCase
  include GomamayoChecker

  test 'mecab parse' do
    assert mecab_parse('ホワイトとうもろこし') ==
           "ホワイト\t名詞,一般,*,*,*,*,ホワイト,ホワイト,ホワイト\n" \
           "とうもろこし\t名詞,一般,*,*,*,*,とうもろこし,トウモロコシ,トウモロコシ\nEOS\n"
  end
end
