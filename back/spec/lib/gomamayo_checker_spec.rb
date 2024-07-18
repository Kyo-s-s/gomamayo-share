require 'rails_helper'
# require 'gomamayo_checker'

RSpec.describe GomamayoChecker do
  let(:obj) do
    Object.new.extend(described_class)
  end

  describe 'mecab_parse' do
    it 'parse' do
      expect(obj.mecab_parse('ホワイトとうもろこし')).to eq [
        { surface: 'ホワイト', reading: 'ホワイト' },
        { surface: 'とうもろこし', reading: 'トウモロコシ' }
      ]
    end
  end

  describe 'gomamayo?' do
    it 'success' do
      gomamayos = %w[
        ホワイトとうもろこし
        whiteとうもろこし
        朝採れレタス
      ]
      gomamayos.each do |str|
        expect(obj.gomamayo?(str)).to be true
      end
    end

    it 'failure' do
      not_gomamayos = %w[
        はとぽっぽー
      ]
      not_gomamayos.each do |str|
        expect(obj.gomamayo?(str)).to be false
      end
    end
  end
end
