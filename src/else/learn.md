---
title: 学科笔记
date: 2025-11-02
icon: newspaper
order: 4
author:
  name: Swordfish
  url: https://jandswordfish.github.io/blog/
  email: 2771030100@qq.com
category:
  - 其他
tag:
  - 笔记
---

# 学科笔记

## 编译原理实验1

```
#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <cctype>
#include <stack>

using namespace std;

// Token类型定义
enum TokenType {
    KEYWORD = 1,    // 关键字
    IDENTIFIER = 2, // 标识符
    CONSTANT = 3,   // 常量
    OPERATOR = 4,   // 运算符
    DELIMITER = 5   // 分隔符
};

// Token结构
struct Token {
    TokenType type;
    string value;
    
    Token(TokenType t, const string& v) : type(t), value(v) {}
};

class LexicalAnalyzer {
private:
    string input;
    int pos;
    vector<Token> tokens;
    stack<char> brackets; // 用于检查括号配对
    
    // 关键字集合
    unordered_set<string> keywords = {
        "if", "int", "for", "while", "do", "return", "break", "continue", "main"
    };
    
    // 运算符集合
    unordered_set<string> operators = {
        "+", "-", "*", "/", "=", ">", "<", ">=", "<=", "!="
    };
    
    // 分隔符集合
    unordered_set<char> delimiters = {
        ',', ';', '{', '}', '(', ')'
    };

public:
    LexicalAnalyzer(const string& code) : input(code), pos(0) {}
    
    // 跳过空白字符和注释
    void skipWhitespaceAndComments() {
        while (pos < input.length()) {
            // 跳过空白字符和制表符
            if (isspace(input[pos])) {
                pos++;
                continue;
            }
            
            // 跳过单行注释 //
            if (pos + 1 < input.length() && input[pos] == '/' && input[pos + 1] == '/') {
                pos += 2;
                while (pos < input.length() && input[pos] != '\n') {
                    pos++;
                }
                continue;
            }
            
            // 跳过多行注释 /* */
            if (pos + 1 < input.length() && input[pos] == '/' && input[pos + 1] == '*') {
                pos += 2;
                while (pos + 1 < input.length()) {
                    if (input[pos] == '*' && input[pos + 1] == '/') {
                        pos += 2;
                        break;
                    }
                    pos++;
                }
                continue;
            }
            
            break;
        }
    }
    
    // 读取标识符或关键字
    string readIdentifier() {
        string result;
        while (pos < input.length() && (isalnum(input[pos]) || input[pos] == '_')) {
            result += input[pos++];
        }
        return result;
    }
    
    // 读取数字（支持整数、实数、科学计数法）
    string readNumber() {
        string result;
        
        // 读取整数部分
        while (pos < input.length() && isdigit(input[pos])) {
            result += input[pos++];
        }
        
        // 检查小数点
        if (pos < input.length() && input[pos] == '.') {
            result += input[pos++];
            // 读取小数部分
            while (pos < input.length() && isdigit(input[pos])) {
                result += input[pos++];
            }
        }
        
        // 检查科学计数法 (E或e)
        if (pos < input.length() && (input[pos] == 'E' || input[pos] == 'e')) {
            result += input[pos++];
            // 检查正负号
            if (pos < input.length() && (input[pos] == '+' || input[pos] == '-')) {
                result += input[pos++];
            }
            // 读取指数部分
            while (pos < input.length() && isdigit(input[pos])) {
                result += input[pos++];
            }
        }
        
        return result;
    }
    
    // 读取运算符
    string readOperator() {
        string result;
        
        // 检查双字符运算符
        if (pos + 1 < input.length()) {
            string twoChar = input.substr(pos, 2);
            if (operators.count(twoChar)) {
                pos += 2;
                return twoChar;
            }
        }
        
        // 单字符运算符
        if (pos < input.length()) {
            string oneChar(1, input[pos]);
            if (operators.count(oneChar)) {
                pos++;
                return oneChar;
            }
        }
        
        return result;
    }
    
    // 检查括号配对
    bool checkBrackets(char ch) {
        if (ch == '(' || ch == '{') {
            brackets.push(ch);
        } else if (ch == ')') {
            if (brackets.empty() || brackets.top() != '(') {
                cout << "错误：')' 不匹配" << endl;
                return false;
            }
            brackets.pop();
        } else if (ch == '}') {
            if (brackets.empty() || brackets.top() != '{') {
                cout << "错误：'}' 不匹配" << endl;
                return false;
            }
            brackets.pop();
        }
        return true;
    }
    
    // 词法分析主函数
    vector<Token> analyze() {
        while (pos < input.length()) {
            skipWhitespaceAndComments();
            
            if (pos >= input.length()) break;
            
            char currentChar = input[pos];
            
            // 识别标识符或关键字
            if (isalpha(currentChar) || currentChar == '_') {
                string word = readIdentifier();
                if (keywords.count(word)) {
                    tokens.push_back(Token(KEYWORD, word));
                } else {
                    tokens.push_back(Token(IDENTIFIER, word));
                }
            }
            // 识别数字
            else if (isdigit(currentChar)) {
                string number = readNumber();
                tokens.push_back(Token(CONSTANT, number));
            }
            // 识别分隔符
            else if (delimiters.count(currentChar)) {
                checkBrackets(currentChar);
                tokens.push_back(Token(DELIMITER, string(1, currentChar)));
                pos++;
            }
            // 识别运算符
            else {
                string op = readOperator();
                if (!op.empty()) {
                    tokens.push_back(Token(OPERATOR, op));
                } else {
                    // 跳过未识别字符
                    pos++;
                }
            }
        }
        
        // 检查是否有未匹配的括号
        if (!brackets.empty()) {
            cout << "错误：存在未匹配的左括号" << endl;
        }
        
        return tokens;
    }
    
    // 输出结果
    void printTokens() {
        for (const auto& token : tokens) {
            cout << "（" << token.type << "，\"" << token.value << "\"）" << endl;
        }
    }
    
    // 清空当前分析结果
    void clear() {
        tokens.clear();
        pos = 0;
        while (!brackets.empty()) {
            brackets.pop();
        }
    }
};

int main() {
    string code;
    string line;
    
    // 读取输入的C语言代码
    while (getline(cin, line)) {
        code += line + "\n";
    }
    
    // 创建词法分析器并分析
    LexicalAnalyzer analyzer(code);
    analyzer.analyze();
    analyzer.printTokens();
    
    return 0;
}

%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Token类型定义 */
#define KEYWORD 1
#define IDENTIFIER 2
#define CONSTANT 3
#define OPERATOR 4
#define DELIMITER 5

/* 全局变量 */
int bracket_stack[1000];
int stack_top = -1;
int error_flag = 0;

/* 函数声明 */
void push_bracket(char c);
int pop_bracket(char c);
void print_token(int type, char* value);
void check_brackets();
%}

/* 定义模式 */
DIGIT       [0-9]
LETTER      [a-zA-Z]
IDENTIFIER  ({LETTER}|_)({LETTER}|{DIGIT}|_)*
INTEGER     {DIGIT}+
REAL        {DIGIT}+\.{DIGIT}+
SCIENTIFIC  ({INTEGER}|{REAL})[eE][+-]?{DIGIT}+
WHITESPACE  [ \t\n\r]+

/* 状态定义 */
%x COMMENT_SINGLE
%x COMMENT_MULTI

%%

/* 处理单行注释 */
"//"                { BEGIN(COMMENT_SINGLE); }
<COMMENT_SINGLE>\n  { BEGIN(INITIAL); }
<COMMENT_SINGLE>.   { /* 忽略注释内容 */ }

/* 处理多行注释 */
"/*"                { BEGIN(COMMENT_MULTI); }
<COMMENT_MULTI>"*/" { BEGIN(INITIAL); }
<COMMENT_MULTI>\n   { /* 忽略换行 */ }
<COMMENT_MULTI>.    { /* 忽略注释内容 */ }

/* 关键字识别 */
"if"        { print_token(KEYWORD, yytext); }
"int"       { print_token(KEYWORD, yytext); }
"for"       { print_token(KEYWORD, yytext); }
"while"     { print_token(KEYWORD, yytext); }
"do"        { print_token(KEYWORD, yytext); }
"return"    { print_token(KEYWORD, yytext); }
"break"     { print_token(KEYWORD, yytext); }
"continue"  { print_token(KEYWORD, yytext); }
"main"      { print_token(KEYWORD, yytext); }

/* 标识符识别 */
{IDENTIFIER} { print_token(IDENTIFIER, yytext); }

/* 常量识别 */
{SCIENTIFIC} { print_token(CONSTANT, yytext); }
{REAL}       { print_token(CONSTANT, yytext); }
{INTEGER}    { print_token(CONSTANT, yytext); }

/* 双字符运算符 */
">="        { print_token(OPERATOR, yytext); }
"<="        { print_token(OPERATOR, yytext); }
"!="        { print_token(OPERATOR, yytext); }

/* 单字符运算符 */
"+"         { print_token(OPERATOR, yytext); }
"-"         { print_token(OPERATOR, yytext); }
"*"         { print_token(OPERATOR, yytext); }
"/"         { print_token(OPERATOR, yytext); }
"="         { print_token(OPERATOR, yytext); }
">"         { print_token(OPERATOR, yytext); }
"<"         { print_token(OPERATOR, yytext); }

/* 分隔符 */
","         { print_token(DELIMITER, yytext); }
";"         { print_token(DELIMITER, yytext); }
"{"         { push_bracket('{'); print_token(DELIMITER, yytext); }
"}"         { if(!pop_bracket('}')) error_flag = 1; print_token(DELIMITER, yytext); }
"("         { push_bracket('('); print_token(DELIMITER, yytext); }
")"         { if(!pop_bracket(')')) error_flag = 1; print_token(DELIMITER, yytext); }

/* 忽略空白字符 */
{WHITESPACE} { /* 忽略空白字符 */ }

/* 处理未识别字符 */
.           { printf("警告: 未识别字符 '%s'\n", yytext); }

%%

/* C代码段 */

/* 输出Token的函数 */
void print_token(int type, char* value) {
    printf("（%d，\"%s\"）\n", type, value);
}

/* 压栈函数 */
void push_bracket(char c) {
    if (stack_top < 999) {
        bracket_stack[++stack_top] = c;
    }
}

/* 出栈函数 */
int pop_bracket(char c) {
    if (stack_top < 0) {
        printf("错误: '%c' 不匹配\n", c);
        return 0;
    }
    
    char expected = (c == ')') ? '(' : '{';
    if (bracket_stack[stack_top] != expected) {
        printf("错误: '%c' 不匹配\n", c);
        return 0;
    }
    
    stack_top--;
    return 1;
}

/* 检查剩余未匹配的括号 */
void check_brackets() {
    if (stack_top >= 0) {
        printf("错误: 存在未匹配的左括号\n");
        error_flag = 1;
    }
}

/* 主函数 */
int main(int argc, char* argv[]) {
    FILE* input_file = stdin;
    
    /* 如果提供了文件名参数 */
    if (argc > 1) {
        input_file = fopen(argv[1], "r");
        if (!input_file) {
            fprintf(stderr, "错误: 无法打开文件 %s\n", argv[1]);
            return 1;
        }
        yyin = input_file;
    }
    
    /* 执行词法分析 */
    yylex();
    
    /* 检查括号匹配 */
    check_brackets();
    
    /* 关闭文件 */
    if (input_file != stdin) {
        fclose(input_file);
    }
    
    /* 返回错误状态 */
    return error_flag;
}

/* yywrap函数 */
int yywrap() {
    return 1;
}
```

