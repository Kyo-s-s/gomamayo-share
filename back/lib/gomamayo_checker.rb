require 'mecab'

module GomamayoChecker
  def mecab_parse(str)
    tagger = MeCab::Tagger.new
    tagger.parse(str).split(/\R/)[0...-1].map do |line|
      line.split(/[\t|,]/)
    end
  end
end
