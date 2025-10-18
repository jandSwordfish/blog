---
title: 笔记
icon: book
order: 5
category:
  - 使用指南
tag:
  - Markdown
---
# 质数

## 6倍速普通方法

```
bool isPrime(int n)
{
	if (n == 2 || n == 3)
		return 1;
	if (n % 6 != 1 && n % 6 != 5)
		return 0;
	for (int i = 5;i * i <= n;i += 6)
		if (n % i == 0 || n % (i + 2) == 0)
			return 0;
	return n > 1;
}
```

## 埃筛（时间换内存）

```
const int N = 1001;
int primes[N];
int cnt = 0;
bool v[N];//注：v[1]=1
void as()
{
	for (int i = 2; i < N; i++)
	{
		if (v[i])
		{
			continue;
		}
		primes[cnt++] = i;
		for (int j = i+i; j < N; j += i)
		{
			v[j] = 1;
		}
	}
}
```

## 欧拉筛（内存换时间）

```
const int N = 1001;
int primes[N];
int cnt = 0;
bool v[N];
void as()
{
	for (int i = 2; i <=N; i++)
	{
		if (!v[i])
		{
			primes[cnt++] = i;
		}
		for (int j = 0; primes[j]*i <=N; j++)
		{
			v[i*primes[j]] = true;
			if (i % primes[j] == 0)
			{
				break;
			}
		}
	}
}
```

# 计算方式

## 求余

```
a+b                   ((a%mod)+(b%mod))%mod
a*b                   同上
a-b                   ((a%mod)-(b%mod)+mod)%mod//+mod防止出现负数
a能整除b时             (a/b)%mod=a%(b*mod)/b
a不能整除b时(费马小定理) (a/b)%mod=a*(b^(mod-2)%mod)%mod
```

## 龟速乘（防止炸范围）

```
ll low(ll a, ll b)
{
	ll ans = 0;
	while (b)
	{
		if (b & 1)
		{
			ans = (ans + a) % mod;
		}
		a = (a + a) % mod;
		b >>= 1;
	}
	return ans;
}
```

## 快速幂（防止超时）

```
ll quick(ll a, ll b)
{
	ll ans = 1;
	while (b)
	{
		if (b & 1)
		{
			ans = low(ans,a);//乘法套用龟速乘，防止炸范围，不套省时间
		}
		a = low(a,a);
		b >>= 1;
	}
	return ans;
}
```

## 矩阵快速幂

## 最大公因数

```
大数等于小数，小数等于余数(a为大数)
ll gcd(ll a, ll b)
{
	return (b? gcd( b, a%b) : a);
}
```

## 最小公倍数

```
最小公倍数×最大公约数=A×B 
ll lcm(ll a, ll b)
{
	return t = a/gcd(a, b)*b;
}
```

## 组合数（C（n,m））

对点求版（数学原理建议版）

```
ll C(ll n, ll m)
{
    if (m > n)
    {
        return 0;
    }
    ll up = 1, down = 1;
    for (ll i = 1; i <= m; i++)
    {
        up *= n - i + 1;
        down *= i;
        up %= mod;
        down %= mod;
    }
    return 费马(up, down);
}
```

预处理版

```
fac[]//阶乘数组
inv[]//逆元数组
！！！一定注意数组大小范围
void pre()//预处理函数
{
	fac[0] = inv[0] = 1;//一定记得处理首位
	for (ll i = 1; i < MAXN; i++)
	{
		fac[i] = (fac[i - 1] * i) % mod;
		inv[i] = quick(fac[i], mod - 2);
	}
}
ll C(ll n, ll m)
{
	if (m > n)
	{
		return 0;
	}
	return (fac[n]* inv[m]  * inv[n - m] ) % mod;//为了方便观察省去了很多取模
}
```

## 排列数（A（n,m））

```
ll A(ll n, ll m)
{
    ll up = 1;
    if (m > n)
        return 0;
    for (int i = n-m+1; i <= n; i++)
    {
        up *= i;
        up %= mod;
    }
    return up;
}
```

## 逆元

逆元：一个数字被除时取模，等于乘以这个数在这个mod下的逆元（与mod互质时才存在）

对点求

```
quick(b,mod-2);
```

线性求逆元

```
inv[1]=1;
for(int i=2;i<=n;i++)
{
   inv[i]=mod-(mod/i)*inv[mod%i]%mod;
   cout<<inv[i]<<'\n';
}
```

# 二分查找

```
ll f(ll x)
{
	ll t = 1, f = n;
	while (t<=f)
	{
		ll mid = t + f >> 1;
		if (cnt[mid] < x)
		{
			t = mid + 1;
		}
		else
		{
			f = mid - 1;
		}
	}
	return t;
}
若存在，则返回第一次出现的下标
若不存在，则返回大于这个数的第一个数字下标
```

```
ll f(ll x)
{
	ll t = 1, f = n;
	while (t<=f)
	{
		ll mid = t + f >> 1;
		if (cnt[mid] <= x)
		{
			t = mid + 1;
		}
		else
		{
			f = mid - 1;
		}
	}
	return f;
}
若存在，则返回最后一次出现的下标
若不存在，则返回小于这个数的最后一个数字下标
```

```
ll f(ll x)
{
	ll t = 1, f = n;
	while (t<=f)
	{
		ll mid = t + f >> 1;
		if (cnt[mid] <= x)
		{
			t = mid + 1;
		}
		else
		{
			f = mid - 1;
		}
	}
	return t;
}
返回大于这个数字的第一个数字的下标
```

```
ll f(ll x)
{
	ll t = 1, f = n;
	while (t<=f)
	{
		ll mid = t + f >> 1;
		if (cnt[mid] < x)
		{
			t = mid + 1;
		}
		else
		{
			f = mid - 1;
		}
	}
	return f;
}
返回小于这个数字的第一个数字的下标
```

## 二分查找函数

任何有序容器都可以使用

```
lower_bound(x)  STL:返回>=x的第一个元素的迭代器(没找到返回end（）)
                数组：返回>=x的第一个元素下标（没找到返回0）
upper_bound(x)  STL:返回>=x的第一个元素的迭代器(没找到返回end（）)
                数组：返回>=x的第一个元素下标（没找到返回0）
```

# 选择方式

## 二进制枚举

```
eg:  1 2 3
     0 1 1
第二列1代表选取，0代表未选取
for (int i = 0; i < (1<<n); i++)//例如n为3，则需要选择0 0 0**0 0 1**0 1 0....1 1 1，即为000到111（2^4-1次）
{
	int sum = 0;
	for (int j = 0; j < n; j++)
	{
		if ((1 << j) & i)//如当i选取1 0 1时，j==1时，sum加，j==2时，010&010==0，sum不加...
		{
			sum += a[j];
		}
	}
	set.insert(sum);//去重
}
```

# 排列方式

## 全排列

即所有的可能性

eg:123的全排列  123 132 213 231 312 321
有两种方法

```
1.DFS（利：无序数组也可以放入，弊：出现重复数字时会输出重复数组，此时用set可以去重）
void DFS(int x)
{
	if (x == n + 1)
	{
		for (int i = 1; i <= n; i++)
		{
			cout << a[i];
		}
		return;
	}
	set<int>s;
	for (int i = 1; i <= n; i++)
	{
		if (!v[i]&&s.find(v[i])==s.end())
		{
			v[i] = 1;//判断该数字是否被选择过
			s.insert(v[i]);//去重，保证不会讲重复数字排在同一位置
			a[x] = i;
			DFS(x + 1);
			v[i] = 0;
		}
	}
}
```

```
2.函数（next_permutation(a,a+n)）(利：出现重复时不会重复输出，弊：&&一定要有序&&才可以排)
do
{
	for (int i = 0; i < 3; i++)
	{
		cout << a[i] << " \n"[i == 2];
	}
} while (next_permutation(a, a + 3));
//让a自动排列出全排列（true），直到全输出（false）
```

# 进制转换

## 10进制转k进制

```
（1.可存字母2.可超long3.先do是为了防止出现0的情况（不进行循环））
string _10tok(ll n,int k)
{
	string s = "";
	do
	{
		if (n % k < 10)
		{
			s += (n % k) + '0';
		}
		else
		{
			s += (n % k) + 'A' - 10;
		}
		n /= k;
	} while (n);
	reverse(s.begin(), s.end());
	return s;
}
```

## k进制转10进制

```
（可以边乘边取余）
ll kto10(int k, string s)
{
	ll n=0;
	int len = s.size();
	for (int i = 0; i < len; i++)
	{
		n *= k;
		if (s[i] >= '0' && s[i] <= '9')
		{
			n += s[i] - '0';
		}
		else
		{
			n += s[i] - 'A' + 10;
		}
	}
	return n;
}
```

# 高精度

## 前置函数

### 去前置0

```
string _delete(string s)
{
	for (int i = 0; i < s.size(); i++)
	{
		if (s[i] != '0')
		{
			return  s.substr(i);
		}
	}
	return "0";
}
```

### 去除小数点

```
string removed(string s)
{
	for (int i = 0; i < s.size(); i++)
	{
		if (s[i] == '.')
		{
			return s.substr(0, i) + s.substr(i+1);
		}
	}
	return s;
}
```

## 高精度加法

```
string _plus(string a, string b)(限2个数大于0)
{  
	reverse(a.begin(), a.end());
	reverse(b.begin(), b.end());
	int len = max(a.size(), b.size());
	vector<int>v(len+5);
	for (int i = 0; i < a.size(); i++)
	{
		v[i] += a[i] - '0';
	}
	for (int i = 0; i < b.size(); i++)
	{
		v[i] += b[i] - '0';
	}
	for (int i = 0; i < len; i++)
	{
		v[i + 1] += v[i] / 10;
		v[i] %= 10;
	}
	string sum;
	for (int i = 0; i <= len; i++)
	{
		sum += v[i] + '0';
	}//加法等于len，减法不等，因为不会越减越大
	reverse(sum.begin(), sum.end());
	return _delete(sum);
}
```

## 高精度减法

```
string op = "";
if (a.size() < b.size() || a.size()==b.size()&&a < b)
{
	op = "-";
	swap(a, b);
}
string _sub(string a, string b)
{  
	reverse(a.begin(), a.end());
	reverse(b.begin(), b.end());
	int len = max(a.size(), b.size());
	vector<int>v(len+5);
	for (int i = 0; i < a.size(); i++)
	{
		v[i] += a[i] - '0';
	}
	for (int i = 0; i < b.size(); i++)
	{
		v[i] -= b[i] - '0';
	}
	for (int i = 0; i < len; i++)
    {
	   while (v[i] < 0)
	  {
	    v[i] += 10;
	    v[i + 1]--;
	  }
    }
	string sum;
	for (int i = 0; i < len; i++)
	{
		sum += v[i] + '0';
	}//加法等于len，减法不等，因为不会越减越大
	reverse(sum.begin(), sum.end());
	return _delete(sum);
}
```

## 高精度乘法

```
string _mul(string a, string b)(限2个数大于0)
{  
	reverse(a.begin(), a.end());
	reverse(b.begin(), b.end());
	int len = len=a.size()+b.size();
	vector<int>v(len+5);
	for (int i = 0; i < a.size(); i++)
	{
		for (int j = 0; j < b.size(); j++)
		{
			v[i+j] += (b[j] - '0')*(a[i]-'0');
		}
	}//（len=a.size()+b.size()）
	string sum;
	for (int i = 0; i <= len; i++)
	{
		sum += v[i] + '0';
	}
	reverse(sum.begin(), sum.end());
	return _delete(sum);
}
```

## 高精度除法

```
string _mul(string a, string b)(限2个数大于0)
{  
 sum="";
 string res;
 for (int i = 0; i < a.size(); i++)
  {
	  sum =remove(sum+a[i]);
	  res+='0';
	  while (sum.size() > b.size() || sum.size() == b.size() && sum >=b)
	  {
	 	  sum=sub(sum, b);
	 	  res[i]++;
	  }
  }
 return remove(res);
}
函数结束后 sum 就是余数
```

# 前缀和（区间查询）

## 一维前缀和

```
int a[N],b[N];//a原数组，b前缀和数组
int main()
{
  cin>>n>>m;
for(int i=1;i<=n;i++)
{
  cin>>a[i];
  b[i]=b[i-1]+a[i];
}
  int l,r;
while(m--)
{
  cin>>l>>r;
  cout<<b[r]-b[l-1]；//输出区间和
}
```

## 二维前缀和

```
memset(s, 0, sizeof(s));
for (int i = 0; i < n; i++)
{
	ll a, b;
	cin >> a >> b;
	s[a][b] += a * b;
}
for (int i = 1; i <= 1000; i++)
{
	for (int j = 1; j <= 1000; j++)
	{
		s[i][j] += s[i][j - 1] + s[i - 1][j] - s[i - 1][j - 1];//构造：点原本自带的数字加上单边减1减去双边减1
	}
}
while (q--)
{
	int a1, b1, a2, b2;//1为小边,2为大边
	cin >> a1 >> b1 >> a2 >> b2;
	cout << s[a2][b2] - s[a2][b1 - 1] - s[a1 - 1][b2] + s[a1 - 1][b1 - 1] << '\n';//查询：就把构造反过来，一大边一小边
}
```

# 差分（区间修改）

## 一维差分

```
void insert(int l,int r,int c)//b数组是前缀和数组，注意使用差分则不能区间查询
{
   b[l]+=c;
   b[r+1]-=c;
}
```

## 二维差分

```
void insert(int l,int r,int c)//b数组是前缀和数组，注意使用差分则不能区间查询
{
   b[l]+=c;
   b[r+1]-=c;
}
//查询
b[i][j]=b[i-1][j]+b[i][j-1]-b[i-1][j-1];
```

# 树状数组

```
int a[N];//原数组
int b[N];//树状数组
int lowbit(int x)
{
    return x & -x;
}
void add(int x, int k)//输入/更新
{
    for (int i = x; i <N; i += lowbit(i))
    {
        b[i] += k;
    }
}
int count(int r,int l)//求和/查询
{
    int sum = 0;
    for (int i = r; i; i -= lowbit(i))
    {
        sum += b[i];
    }
    for (int i = l - 1; i; i -= lowbit(i))
    {
        sum -= b[i];
    }
    return sum;
}
```

# STL容器

具体的看群里文件

## 小tip：

关于map的边遍历边删除（先加入一个大于数据范围的键值（防空），最后在将其删除）

    mp[1000000009] = 1;
    auto t = mp.begin();//上一个迭代器
    bool o = 0;
    for (auto i = mp.begin(); i != mp.end(); i++)
    {
       if (o)
       {
        mp.erase(t);
        o = 0;
       }
       f ((*i).second < b)//不满足条件的，将在下一次删除
       {
         o = 1;
         t = i;
       }
    }
    mp.erase(1000000009);

# BFS（走地图）

一定注意看清x轴和y轴！！！

```
int sx, sy, ex, ey;//起点坐标与终点坐标
char mp[25][25];
int dir[4][2] = { 0,1,0,-1,1,0,-1,0 };//方向数组
bool v[25][25];
struct Point
{
    int x, y，s;//坐标和步数
};
int BFS()
{
    Point begin = { sx,sy,0 };
    v[sx][sy] = 1;
    queue<Point>q;
    q.push(begin);
    while (q.size())
    {
        auto front = q.front();
        q.pop();
        if (front.x == ex && front.y == ey)
        {
          return front.s;
        }
        for (int i = 0; i < 4; i++)//四个方向
        {
            int nx = front.x + dir[i][0];
            int ny = front.y + dir[i][1];
            if (mp[nx][ny] != '#' && !v[nx][ny])
            {
                q.push({ nx,ny,front.s + c });
                v[nx][ny] = 1;
            }
        }
    }
}
```

# 并查集

```
int fa[6000];
int rank_[6000];
int size[6000];
int find(int x)//正常查找父节点
{
	return  x == fa[x] ? x : find(fa[x]);
}
int find(int x)//压缩路径查找父节点
{
	return  x == fa[x] ? x : (fa[x] = find(fa[x]));
}
for (int i = 0; i < 5700; i++)//正常初始化
{
	fa[i] = i;
}
void merge(int i, int j)//正常合并
{
	fa[find(i)] = find(j);
}
void merge(int i, int j)//按照秩(树高)初始化
{
	fa[i] = i;
	rank[i] = 1;
}
void rank_merge(int i, int j)//按照秩(树高)合并
{
	int x = find(i), y = find(j);
	if (rank_[x] <= rank_[y])
		fa[x] = y;
	else
		fa[y] = x;
	if (rank_[x] == rank_[y] && x != y)
	{
		rank_[y]++;
	}
}
void rank_merge(int i, int j)//按照秩(节点数)合并
{
	int x = find(i), y = find(j);
	if (x == y)
		return;
	if(size[x]>size(y))
		swap(x,y);
		fa[x]=y;
		size[y]+=size[x];
}
```

# 容斥原理

1.奇加偶减

求 100以内 2 3 5有多少的倍数，（算出sum+=2，3，5的倍数，sum-=【2，3】，【2，5】【3，5】的倍数，sum+=【2，3，5】的倍数）【】为lcm（最小公倍数）

2.正难则反

# 动态规划dp

## 记忆化搜索

找到已经查询过的数字

## 线性dp

### 求最长上升子序列

```
memset(b, 0x3f, sizeof(b));//先赋
for (int i = 1; i <= n; i++)
{
	cin >> a[i];
}
int len = 0;
for (int i = 1; i <= n; i++)
{
	int x = lower_bound(b+1, b + len+1, a[i])-b;//二分找到合适的位置用更小的替换
	b[x] = a[i];
	len = max(len, x);
}
```

## 01背包（两种状态的dp）

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi
>
> 思考：物品作为阶段，容量作为状态 得出
>
> **在这个重量时，拿与不拿的最佳状态**

    int w[1002],v[1002];//weight value
	int dp[1002][1002];//num weight = value
	int main() {
		int m, n;
		cin >> m >> n;
		for (int i = 1; i <= n; i++)
		{
			int a, b;
			cin >> a >> b;
			w[i] = a;
			v[i] = b;
		}
		for (int i = 1; i <= n; i++)//第几个物品
		{
			for (int j = 1; j <=m; j++)//在这个空间下的最大价值
			{
				if (j >= w[i])//拿的下就拿
				{
					dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
				}
				else//拿不下就跳
				{
					dp[i][j] = dp[i - 1][j];
				}
			}
		}
		cout << dp[n][m];
		return 0;
	}//留下很多信息，方案题适用

### 压缩成二维

> 每一行的dp，只与其**上一行的前面的数据**相关，如果不需要前面每一的数据，则可以优化一下空间，可以用两个数组交替保存每一行的信息

```
int w[1002],v[1002];//weight value
int dp[2][1002];//num weight = value
int main() {
	int m, n;
	cin >> m >> n;
	for (int i = 1; i <= n; i++)
	{
		int a, b;
		cin >> a >> b;
		w[i] = a;
		v[i] = b;
	}
	for (int i = 1; i <= n; i++)//第几个物品
	{
		for (int j = 1; j <= m; j++)//在这个空间下的最大价值
		{
			if (j >= w[i])//拿的下就拿
			{
				dp[i & 1][j] = max(dp[(i - 1) & 1][j], dp[(i - 1) & 1][j - w[i]] + v[i]);
			}
			else//拿不下就跳
			{
				dp[i & 1][j] = dp[(i - 1) & 1][j];
			}
		}
	}
	cout << dp[n&1][m];
	return 0;
}
```

### 压缩成一维

> **（前提是）**每一行的dp，只与其**上一行的前面的数据**相关，如果不需要前面每一的数据，则可以优化一下空间，因为是前面的数据，直接用会被覆盖，所以要反向dp，相当于在同一行操作，后面的是新的，前面的是旧的。

```
int w[1002],v[1002];//weight value
int dp[1002];//weight = value
int main() {
	int m, n;
	cin >> m >> n;
	for (int i = 1; i <= n; i++)
	{
		int a, b;
		cin >> a >> b;
		w[i] = a;
		v[i] = b;
	}
	for (int i = 1; i <= n; i++)//第几个物品
	{
		for (int j = m; j >= w[i]; j--)//在这个空间下的最大价值
		{
			dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
		}
	}
	cout << dp[m];
	return 0;
}
```

## 多重01背包

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi,**一个物品可以选k次**

```
int w[1002],v[1002];//weight value
int dp[1002];//weight = value
int main() {
	int m, n;
	cin >> m >> n;
	int pos=1;
	for (int i = 1; i <= n; i++)
	{
		int a, b,c;
		cin >> a >> b>>c;
		w[i] = a;
		v[i] = b;
		for(int j=1;j<=c;j*=2)//1 2 4 8...一定可以组成c以内的所有的数字(二进制拆分)
		{
			w[pos]=a*j;
			v[pos++]=b*j;
			c-=j;
		}
		if(c!=0)
		{
			w[pos]=a*c;
			v[pos++]=b*c;
		}
	}
	for (int i = 1; i < pow; i++)//第几个物品(注意是pos不是N)
	{
		for (int j = m; j >= w[i]; j--)//在这个空间下的最大价值
		{
			dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
		}
	}
	cout << dp[m];
	return 0;
}
```

## 完全01背包

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi,**一个物品可以选无数次**
>
> 思考：01背包压缩成一维时，为了避免重复选择而反向dp，所避免的重复选择不正是完全背包

```
int w[1002],v[1002];//weight value
int dp[1002];//weight = value
int main() {
	int m, n;
	cin >> m >> n;
	for (int i = 1; i <= n; i++)
	{
		int a, b;
		cin >> a >> b;
		w[i] = a;
		v[i] = b;
	}
	for (int i = 1; i <= n; i++)//第几个物品
	{
		for (int j = w[i]; j <= m; j++)//在这个空间下的最大价值
		{
			dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
		}
	}
	cout << dp[m];
	return 0;
}
```

## 混合01背包

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi,**一个物品可以选k次，k为0则可以无限选取**

```
int w[1002],v[1002]，k[1002];//weight value cnt
int dp[1002];//weight = value
int main() {
	int m, n;
	cin >> m >> n;
	int pos = 1;
	for (int i = 1; i <= n; i++)
	{
		int a, b, c;
		cin >> a >> b >> c;
		if (c == 0)
		{
			w[pos] = a ;
			k[pos] = c;
			v[pos++] = b;
		}
		for (int j = 1; c >= j; j *= 2)
		{
			w[pos] = a * j;
			v[pos] = b * j;
			k[pos++] = 1;
			c -= j;
		}
		if (c != 0)
		{
			w[pos] = a * c;
			k[pos] = 1;
			v[pos++] = b * c;
		}
	}
	for (int i = 1; i < pos; i++)//第几个物品
	{
		if (k[i])//多重
		{
			for (int j = m; j >= w[i]; j--)//在这个空间下的最大价值
			{
				dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
			}
		}
		else//完全
		{
			for (int j = w[i]; j <= m; j++)//在这个空间下的最大价值
			{
				dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
			}
		}
	}
	cout << dp[m];
	return 0;
}
```

## 分组01背包

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi，所属组号为ki（组号相同的物品至多选取一个）
>
> 核心是将重量与物品位置对换，实现重量为阶段，物品为状态，就可以得出
>
> **在考虑拿不拿这个物品时的，拿与不拿的最佳重量下的状态**

```
int m, n;
cin >> m >> n;
for (int i = 1; i <= n; i++)
{
	int a, b, c;
	cin >> a >> b >> c;
	w[c][i] = a;
	v[c][i] = b;
}
for (int i = 1; i <= 100; i++)//组号
{
	for (int j = m; j >= 0; j--)//重量
	{
		for (int k = 1; k <= n; k++)//物品
		{
			if (w[i][k] <= j)
			{
				dp[j] = max(dp[j], dp[j - w[i][k]] + v[i][k]);
			}
		}
	}
}
cout << dp[m];
```

## 二维01背包

> 有N件物品和一个容量为M，容积为V的卡车。
>
> 已知第i件物品的重量是wi，体积是vi,价值是vi
>
> 求解如何选取物品才能使装入卡车的物品价值总和最大。

```
int w[102], v[102],t[102];//weight value volume
int dp[1002][1002];
int x,y,z;
cin >> x>>y>>z;
for (int i = 1; i <= x; i++)
{
	int a;
	cin >> a ;
	w[i] = a;
}
for (int i = 1; i <= x; i++)
{
	int a;
	cin >> a;
	t[i] = a;
}
for (int i = 1; i <= x; i++)
{
	int a;
	cin >> a;
	v[i] = a;
}
for (int i = 1; i <= x; i++)
{
	for (int j = y; j >= 0; j--)
	{
		for (int k = z; k >= 0; k--)
		{
			if (w[i] <= j && t[i] <= k)
			{
				dp[j][k] = max(dp[j][k], dp[j - w[i]][k - t[i]] + v[i]);
			}
		}
	}
}
cout << dp[y][z];
```

## 01背包问题求具体方案

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi
>
> 求解如何选取物品才能使装入背包的物品价值总和最大。
>
> （物品从N选到1）

```
int m,n;
cin >> m>>n;
for (int i = 1; i <= n; i++)
{
	int a, b;
	cin >> a >> b;
	w[i] = a;
	v[i] = b;
}
for (int i = n; i >= 1; i--)
{
	for (int j = 1; j <= m; j++)
	{
		if (j >= w[i])
		{
			dp[i][j] = max(dp[i + 1][j], dp[i + 1][j - w[i]]+v[i]);
		}
		else
		{
			dp[i][j] = dp[i + 1][j];
		}
	}
}
int x = m;
int t = 0;
for (int i = 1; i <= n; i++)
{
	if (x >= w[i] && dp[i][x] == dp[i + 1][x - w[i]]+v[i])
	{
		if (t++)cout << " ";
		cout << i;
		x -= w[i];
	}
}
```

## 容量很大的01背包问题

> 有N件物品和一个容量为M的背包。
>
> 已知第i件物品的重量是wi，价值是vi（1≤M≤1e9，1≤N≤100）
>
> (翻转dp的含义，在这个价值下的最小重量，最后一个值小于容量的dp则为答案)

```
int m, n;
cin >> m >> n;
memset(dp, 0x3f, sizeof dp);
dp[0] = 0;
for (int i = 1; i <= n; i++)
{
	cin >> w[i] >> v[i];
}
int a = 0;
for (int i = 1; i <= n; i++)
{
	for (int j = MAX_VALUE; j >=v[i]; j--)
	{
		dp[j] = min(dp[j], dp[j - v[i]] + w[i]);
	}
}
for (int i = 0; i <= MAX_VALUE; i++)
{
	if (dp[i] <= m)
		a = max(i, a);
}
cout << a;
```

# 堆

堆的前提是必须是完全二叉树（只允许树的最后一排不为满，且顺序从左往右，中间不能空缺）

大根堆：父元素节点大于子节点元素

小根堆：子节点元素大于父节点元素

> **节点下标为i，则：左子节点下标为2i+1，右子节点下标为2i+2**

下沉：如在大根堆中，有一个节点破坏了堆序性，那么每次都较大的子节点交换，这个节点就会下沉到对应的位置（Ologn）

上浮：如在小根堆中，有一个节点破坏了堆序性，那么每次父节点大于这个节点，则交换，这个节点会上浮到对应的位置（用于插入，O（logn））

自顶向下建堆法：每次插入，对每次插入的元素进行上浮

自下而上建堆法：全部插入，从下往上进行下沉操作

优先队列：利用小根堆，每次弹出父节点（即最小节点），然后把最后一个根节点放在弹出父节点的位置，然后进行下沉

# 排序

## 快速排序

```
void sort_(int a[], int low, int high)//low是最低位的下标，high是最高位数的下标（a.size()-1）
{
	if (low >= high) return;
	int i = low - 1;
	int j = high + 1;
	int key = a[i + j >> 1];
	while (i < j)
	{
		do i++; while (a[i] < key);
		do j--; while (a[j] > key);
		if (i < j)swap(a[i], a[j]);
	}
	sort_(a, low, j);
	sort_(a, j + 1, high);
}
```

## 归并排序

```
void merge(int arr[], int tempArr[],int left,int mid,int right)
{
	int l_pos = left;
	int r_pos = mid+1;
	int pos = left;//答案数组的下标
	while (l_pos <= mid && r_pos <= right)
	{
		if (arr[l_pos] < arr[r_pos])
			tempArr[pos++] = arr[l_pos++];
		else
			tempArr[pos++] = arr[r_pos++];
	}
	while (l_pos <= mid)//剩余
	{
		tempArr[pos++] = arr[l_pos++];
	}
	while (r_pos <= right)//剩余
	{
		tempArr[pos++] = arr[r_pos++];
	}
	//临时数组的数组传入原数组
	while (left <= right)
	{
		arr[left] = tempArr[left];
		left++;
	}
}
void msort(int arr[], int tempArr[], int left,int right)
{

	if (left < right)//等于的时候结束
	{
		int mid = (left + right) / 2;
		msort(arr,tempArr,left,mid);
		msort(arr,tempArr, mid+1, right);
		//完成划分后进入合并
		merge(arr, tempArr, left, mid, right);
	}

}
```

# 最短路

## Dijkstra

```
vector<int>Dijkstra(int n,int stay) {
	vector<int>dis(n, 0x3f3f3f);
	vector<bool>vis(n, 0);
	dis[stay] = 0;
	priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;
	q.push({ 0,stay });
	while (q.size())
	{
		int point = q.top().second;
		int d = q.top().first;
		q.pop();
		if (vis[point])
			continue;
		for (int i = 0; i < n; i++)
		{
			int now_dis = d+mp[point][i];
			if (mp[point][i]!=0&&!vis[i])
			{
				if (now_dis < dis[i])
				{
					dis[i] = now_dis;
					q.push({ now_dis ,i });
				}

			}
		}
	}
	return dis;
}
```
