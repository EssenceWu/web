$(function(){
	var index={
		 init:function(){
		 	 that = this;
             that.start();
		 },
		 start:function(){
            var arr=["成功的秘诀，在永不改变既定的目的。——卢梭", "深窥自己的心，而后发觉一切的奇迹在你自己。——培根", "许多次失败总会造就一次成功。——佚名", "路是脚踏出来的，历史是人写出来的。人的每一步行动都在书写自己的历史。——吉鸿昌", "成功就是当洋溢的生命力突然冲决堤坝而汇入一条合适的渠道。——何怀宏", "成功的快乐在于一次又一次对自己的肯定，而不在于长久满足于某件事情的完成。——罗兰", "成功的秘诀——很简单，无论何时，不管怎样，我也绝不允许自己有一点点灰心丧气。——爱迪生", "常往光明快乐一面看，这就是我一生成功的诀窍。——科克", "先相信自己，然后别人才会相信你。 —— 罗曼·罗兰 ", "人的一生可能燃烧也可能腐朽，我不能腐朽，我愿意燃烧起来！ —— 奥斯特洛夫斯基 ", "人生如同故事。 重要的并不在有多长，而是在有多好。 —— 塞涅卡 ", "人生最终的价值在于觉醒和思考的能力，而不只在于生存。 —— 亚里士多德 ", "人生犹如一本书，愚蠢者草草翻过，聪明人细细阅读。为何如此. 因为他们只能读它一次。 —— 保罗 ", "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。 —— 苏轼", "谁要游戏人生，他就一事无成，谁不能主宰自己，永远是一个奴隶。 —— 歌德 ", "人所缺乏的不是才干而是志向，不是成功的能力而是勤劳的意志。 —— 部尔卫", "每一发奋努力的背后，必有加倍的赏赐。", "人生伟业的建立，不在能知，乃在能行。", "挫折其实就是迈向成功所应缴的学费。", "理想是人生的太阳。 —— 德莱赛", "从不浪费时间的人，没有工夫抱怨时间不够。 —— 杰弗逊", "没有人不爱惜他的生命，但很少人珍视他的时间。 —— 梁实秋", "志向和热爱是伟大行为的双翼。 —— 歌德", "抱怨身处黑暗 不如提灯前行。 ——刘同", "所谓岁月静好，是因为负重前行", "奋斗的英雄，从不孤独。", "如果我们有勇气去追求，我们所有的梦想都可以成为现实。 ——华特·迪士尼", "勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑", "人所缺乏的不是才干而是志向，不是成功的能力而是勤劳的意志。 —— 部尔卫", "愿每次回忆，对生活都不感到负疚。 ——郭小川", "青年时种下什么，老年时就收获什么。 ——易卜生", "人的知识愈广，人的本身也愈臻完善。 ——高尔基", "任何问题都有解决的办法，无法可想的事是没有的。 ——爱迪生", "如果你希望成功，当以恒心为良友，以经验为参谋，以当心为兄弟，以希望为哨兵。——爱迪生", "善于利用零星时间的人，才会做出更大的成绩来。——华罗庚", "生活最沉重的负担不是工作，而是无聊。——罗曼·罗兰", "生活的全部意义在于无穷地探索尚未知道的东西，在于不断地增加更多的知识。——左拉", "时间，就象海棉里的水，只要愿挤，总还是有的。 ——鲁迅", "时间最不偏私，给任何人都是二十四小时；时间也最偏私，给任何人都不是二十四小时。——赫胥黎", "人生应该如蜡烛一样，从顶燃到底，一直都是光明的。 —— 萧楚女", "路是脚踏出来的，历史是人写出来的。人的每一步行动都在书写自己的历史。 —— 吉鸿昌", "社会犹如一条船，每个人都要有掌舵的准备。 —— 易卜生", "人生不是一种享乐，而是一桩十分沉重的工作。 —— 列夫托尔斯泰", "生活真像这杯浓酒，不经三番五次的提炼，就不会这样可口！ —— 郭小川", "沉沉的黑夜都是白天的前奏。 —— 郭小川", "生活的理想，就是为了理想的生活。 —— 张闻天", "一个人越知道时间的价值，越倍觉失时的痛苦呀！——但丁", "聪明的人有长的耳朵和短的舌头。——弗莱格", "希望是厄运的忠实的姐妹。 —— 普希金", "过去属于死神，未来属于你自己。 —— 雪莱"];
            var len=arr.length+1;
            var index=Math.floor(Math.random()*len);
            $("#mathTime").text(arr[index]);
		 },
		
	}
	index.init();
})