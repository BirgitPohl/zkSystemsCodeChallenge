"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFMaker = void 0;

var fs = require('fs');

var PDFDocument = require('pdfmake');

class PDFMaker {
  constructor(minaCoinData) {
    var fonts = {
      Roboto: {
        normal: __dirname + '/../fonts/Roboto-Regular.ttf',
        bold: __dirname + '/../fonts/Roboto-Medium.ttf',
        italics: __dirname + '/../fonts/Roboto-RegularItalic.ttf',
        bolditalics: __dirname + '/../fonts/Roboto-MediumItalic.ttf'
      }
    };
    this.minaCoinData = minaCoinData;
    this.document = new PDFDocument(fonts);
    this.definitions = {};
    this.options = {};
  }

  defineDocument() {
    // TODO Document Builder Pattern fits here
    var content = {};
    content.layout = 'lightHorizontalLines';
    content.table = {};
    content.table.headerRows = 1;
    content.table.width = ['*', '*', 100, '*'];
    content.table.body = [];
    content.table.body.push([{
      text: 'Quantity',
      bold: true
    }, {
      text: 'Description',
      bold: true
    }, {
      text: 'Unit Price',
      bold: true
    }, {
      text: 'Total',
      bold: true
    }]);
    this.minaCoinData.latestBlock.transactions.forEach(transaction => {
      content.table.body.push([transaction.amount, 'Transaction', transaction.amount, '']);
    });
    this.definitions.content = [];
    this.definitions.content.push(content);
  }

  createPDF() {
    this.defineDocument();
    var output = this.document.createPdfKitDocument(this.definitions, this.options);
    output.pipe(fs.createWriteStream(__dirname + '/../pdf/billing.pdf'));
    return output.end(); // finalizes document
  }

}

exports.PDFMaker = PDFMaker;
module.exports.PDFMaker = PDFMaker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9jb21wb25lbnRzL3BkZk1ha2VyLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIlBERkRvY3VtZW50IiwiUERGTWFrZXIiLCJjb25zdHJ1Y3RvciIsIm1pbmFDb2luRGF0YSIsImZvbnRzIiwiUm9ib3RvIiwibm9ybWFsIiwiX19kaXJuYW1lIiwiYm9sZCIsIml0YWxpY3MiLCJib2xkaXRhbGljcyIsImRvY3VtZW50IiwiZGVmaW5pdGlvbnMiLCJvcHRpb25zIiwiZGVmaW5lRG9jdW1lbnQiLCJjb250ZW50IiwibGF5b3V0IiwidGFibGUiLCJoZWFkZXJSb3dzIiwid2lkdGgiLCJib2R5IiwicHVzaCIsInRleHQiLCJsYXRlc3RCbG9jayIsInRyYW5zYWN0aW9ucyIsImZvckVhY2giLCJ0cmFuc2FjdGlvbiIsImFtb3VudCIsImNyZWF0ZVBERiIsIm91dHB1dCIsImNyZWF0ZVBkZktpdERvY3VtZW50IiwicGlwZSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiZW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUEzQjs7QUFFTyxNQUFNRSxRQUFOLENBQWU7QUFDbEJDLEVBQUFBLFdBQVcsQ0FBQ0MsWUFBRCxFQUFlO0FBQ3RCLFFBQU1DLEtBQUssR0FBRztBQUNWQyxNQUFBQSxNQUFNLEVBQUU7QUFDSkMsUUFBQUEsTUFBTSxFQUFFQyxTQUFTLEdBQUksOEJBRGpCO0FBRUpDLFFBQUFBLElBQUksRUFBRUQsU0FBUyxHQUFJLDZCQUZmO0FBR0pFLFFBQUFBLE9BQU8sRUFBRUYsU0FBUyxHQUFJLG9DQUhsQjtBQUlKRyxRQUFBQSxXQUFXLEVBQUVILFNBQVMsR0FBSTtBQUp0QjtBQURFLEtBQWQ7QUFRQSxTQUFLSixZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFNBQUtRLFFBQUwsR0FBZ0IsSUFBSVgsV0FBSixDQUFnQkksS0FBaEIsQ0FBaEI7QUFDQSxTQUFLUSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDSDs7QUFFREMsRUFBQUEsY0FBYyxHQUFJO0FBQ2Q7QUFDQSxRQUFNQyxPQUFPLEdBQUcsRUFBaEI7QUFDQUEsSUFBQUEsT0FBTyxDQUFDQyxNQUFSLEdBQWlCLHNCQUFqQjtBQUNBRCxJQUFBQSxPQUFPLENBQUNFLEtBQVIsR0FBZ0IsRUFBaEI7QUFDQUYsSUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNDLFVBQWQsR0FBMkIsQ0FBM0I7QUFDQUgsSUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNFLEtBQWQsR0FBc0IsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBdEI7QUFDQUosSUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNHLElBQWQsR0FBcUIsRUFBckI7QUFDQUwsSUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNHLElBQWQsQ0FBbUJDLElBQW5CLENBQXdCLENBQ3BCO0FBQUVDLE1BQUFBLElBQUksRUFBRSxVQUFSO0FBQW9CZCxNQUFBQSxJQUFJLEVBQUU7QUFBMUIsS0FEb0IsRUFFcEI7QUFBRWMsTUFBQUEsSUFBSSxFQUFFLGFBQVI7QUFBdUJkLE1BQUFBLElBQUksRUFBRTtBQUE3QixLQUZvQixFQUdwQjtBQUFFYyxNQUFBQSxJQUFJLEVBQUUsWUFBUjtBQUFzQmQsTUFBQUEsSUFBSSxFQUFFO0FBQTVCLEtBSG9CLEVBSXBCO0FBQUVjLE1BQUFBLElBQUksRUFBRSxPQUFSO0FBQWlCZCxNQUFBQSxJQUFJLEVBQUU7QUFBdkIsS0FKb0IsQ0FBeEI7QUFPQSxTQUFLTCxZQUFMLENBQWtCb0IsV0FBbEIsQ0FBOEJDLFlBQTlCLENBQTJDQyxPQUEzQyxDQUFvREMsV0FBRCxJQUFpQjtBQUNoRVgsTUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNHLElBQWQsQ0FBbUJDLElBQW5CLENBQXdCLENBQ3BCSyxXQUFXLENBQUNDLE1BRFEsRUFFcEIsYUFGb0IsRUFHcEJELFdBQVcsQ0FBQ0MsTUFIUSxFQUlwQixFQUpvQixDQUF4QjtBQU1ILEtBUEQ7QUFRQSxTQUFLZixXQUFMLENBQWlCRyxPQUFqQixHQUEyQixFQUEzQjtBQUNBLFNBQUtILFdBQUwsQ0FBaUJHLE9BQWpCLENBQXlCTSxJQUF6QixDQUE4Qk4sT0FBOUI7QUFFSDs7QUFFRGEsRUFBQUEsU0FBUyxHQUFHO0FBQ1IsU0FBS2QsY0FBTDtBQUNBLFFBQU1lLE1BQU0sR0FBRyxLQUFLbEIsUUFBTCxDQUFjbUIsb0JBQWQsQ0FBbUMsS0FBS2xCLFdBQXhDLEVBQXFELEtBQUtDLE9BQTFELENBQWY7QUFDQWdCLElBQUFBLE1BQU0sQ0FBQ0UsSUFBUCxDQUFZakMsRUFBRSxDQUFDa0MsaUJBQUgsQ0FBcUJ6QixTQUFTLEdBQUkscUJBQWxDLENBQVo7QUFDQSxXQUFPc0IsTUFBTSxDQUFDSSxHQUFQLEVBQVAsQ0FKUSxDQUlhO0FBQ3hCOztBQWpEaUI7OztBQW9EdEJDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlbEMsUUFBZixHQUEwQkEsUUFBMUIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBQREZEb2N1bWVudCA9IHJlcXVpcmUoJ3BkZm1ha2UnKTtcblxuZXhwb3J0IGNsYXNzIFBERk1ha2VyIHtcbiAgICBjb25zdHJ1Y3RvcihtaW5hQ29pbkRhdGEpIHtcbiAgICAgICAgY29uc3QgZm9udHMgPSB7XG4gICAgICAgICAgICBSb2JvdG86IHtcbiAgICAgICAgICAgICAgICBub3JtYWw6IF9fZGlybmFtZSAgKyAnLy4uL2ZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZicsXG4gICAgICAgICAgICAgICAgYm9sZDogX19kaXJuYW1lICArICcvLi4vZm9udHMvUm9ib3RvLU1lZGl1bS50dGYnLFxuICAgICAgICAgICAgICAgIGl0YWxpY3M6IF9fZGlybmFtZSAgKyAnLy4uL2ZvbnRzL1JvYm90by1SZWd1bGFySXRhbGljLnR0ZicsXG4gICAgICAgICAgICAgICAgYm9sZGl0YWxpY3M6IF9fZGlybmFtZSAgKyAnLy4uL2ZvbnRzL1JvYm90by1NZWRpdW1JdGFsaWMudHRmJyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5taW5hQ29pbkRhdGEgPSBtaW5hQ29pbkRhdGE7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBuZXcgUERGRG9jdW1lbnQoZm9udHMpO1xuICAgICAgICB0aGlzLmRlZmluaXRpb25zID0ge307XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGRlZmluZURvY3VtZW50ICgpIHtcbiAgICAgICAgLy8gVE9ETyBEb2N1bWVudCBCdWlsZGVyIFBhdHRlcm4gZml0cyBoZXJlXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB7fTtcbiAgICAgICAgY29udGVudC5sYXlvdXQgPSAnbGlnaHRIb3Jpem9udGFsTGluZXMnO1xuICAgICAgICBjb250ZW50LnRhYmxlID0ge307XG4gICAgICAgIGNvbnRlbnQudGFibGUuaGVhZGVyUm93cyA9IDE7XG4gICAgICAgIGNvbnRlbnQudGFibGUud2lkdGggPSBbICcqJywgJyonLCAxMDAsICcqJyBdO1xuICAgICAgICBjb250ZW50LnRhYmxlLmJvZHkgPSBbXTtcbiAgICAgICAgY29udGVudC50YWJsZS5ib2R5LnB1c2goW1xuICAgICAgICAgICAgeyB0ZXh0OiAnUXVhbnRpdHknLCBib2xkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdEZXNjcmlwdGlvbicsIGJvbGQ6IHRydWUgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1VuaXQgUHJpY2UnLCBib2xkOiB0cnVlIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdUb3RhbCcsIGJvbGQ6IHRydWUgfVxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLm1pbmFDb2luRGF0YS5sYXRlc3RCbG9jay50cmFuc2FjdGlvbnMuZm9yRWFjaCgodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnRlbnQudGFibGUuYm9keS5wdXNoKFtcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5hbW91bnQsXG4gICAgICAgICAgICAgICAgJ1RyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5hbW91bnQsXG4gICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmRlZmluaXRpb25zLmNvbnRlbnQgPSBbXTtcbiAgICAgICAgdGhpcy5kZWZpbml0aW9ucy5jb250ZW50LnB1c2goY29udGVudCk7XG5cbiAgICB9XG5cbiAgICBjcmVhdGVQREYoKSB7XG4gICAgICAgIHRoaXMuZGVmaW5lRG9jdW1lbnQoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVQZGZLaXREb2N1bWVudCh0aGlzLmRlZmluaXRpb25zLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICBvdXRwdXQucGlwZShmcy5jcmVhdGVXcml0ZVN0cmVhbShfX2Rpcm5hbWUgICsgJy8uLi9wZGYvYmlsbGluZy5wZGYnKSk7XG4gICAgICAgIHJldHVybiBvdXRwdXQuZW5kKCk7IC8vIGZpbmFsaXplcyBkb2N1bWVudFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMuUERGTWFrZXIgPSBQREZNYWtlcjsiXX0=