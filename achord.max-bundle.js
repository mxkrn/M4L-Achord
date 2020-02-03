
/**
 * This file has been auto-generated in order to prepare external projects using NPM dependencies etc
 * for usage in the [js] and [jsui] object in Max MSP. Any manual changes might be overwritten when regenerating this
 * file. In case you'd like to learn more, report issues etc - pleaser refer to the Project on GitHub:
 *
 * https://github.com/fde31/max-js-bundler
 *
 */
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  'object' === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


_export(_export.S, 'Array', { isArray: _isArray });

var es6_array_isArray = {

};

var isArray = _core.Array.isArray;

var isArray$1 = isArray;

function _arrayWithHoles(arr) {
  if (isArray$1(arr)) return arr;
}

var _addToUnscopables = function () { /* empty */ };

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var _library = true;

var _redefine = _hide;

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

'use strict';



var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

'use strict';








var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

'use strict';





// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i$1 = 0; i$1 < DOMIterables.length; i$1++) {
  var NAME = DOMIterables[i$1];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var web_dom_iterable = {

};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

'use strict';
var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var es6_string_iterator = {

};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$1 = getIterator;

var ITERATOR$2 = _wks('iterator');

var core_isIterable = _core.isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$2] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
};

var isIterable = core_isIterable;

var isIterable$1 = isIterable;

function _iterableToArrayLimit(arr, i) {
  if (!(isIterable$1(Object(arr)) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}



var es6_object_toString = /*#__PURE__*/Object.freeze({

});

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$3 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$3] === it);
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process) == 'process') {
    defer = function (id) {
      process.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};
var _task_1 = _task.set;
var _task_2 = _task.clear;

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise$1 = _global.Promise;
var isNode = _cof(process$1) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise$1.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

'use strict';
// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$1 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$1
};

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var navigator = _global.navigator;

var _userAgent = navigator && navigator.userAgent || '';

var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

'use strict';




var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};

var ITERATOR$4 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$4]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$4] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

'use strict';










var task = _task.set;
var microtask = _microtask();




var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8 || '';
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$2.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode$1) {
      process$2.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

var es6_promise = {

};

// https://github.com/tc39/proposal-promise-finally
'use strict';






_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

var es7_promise_finally = {

};

'use strict';
// https://github.com/tc39/proposal-promise-try




_export(_export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

var es7_promise_try = {

};

var promise = _core.Promise;

var promise$1 = promise;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise$1.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise$1(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString$1 = {}.toString;

var isArray$2 = Array.isArray || function (arr) {
  return toString$1.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();
function typedArraySupport () {
  return true;
  // rollup issues
  // try {
  //   var arr = new Uint8Array(1)
  //   arr.__proto__ = {
  //     __proto__: Uint8Array.prototype,
  //     foo: function () { return 42 }
  //   }
  //   return arr.foo() === 42 && // typed array instances can be augmented
  //       typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
  //       arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  // } catch (e) {
  //   return false
  // }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    // Object.defineProperty(Buffer, Symbol.species, {
    //   value: null,
    //   configurable: true
    // })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray$2(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray$2(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf$1(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf$1(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf$1 (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var _global$1 = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core$1 = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1$1 = _core$1.version;

var _isObject$1 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject$1 = function (it) {
  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails$1 = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors$1 = !_fails$1(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$3 = _global$1.document;
// typeof document.createElement is 'object' in old IE
var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
var _domCreate$1 = function (it) {
  return is$1 ? document$3.createElement(it) : {};
};

var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive$1 = function (it, S) {
  if (!_isObject$1(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP$1 = Object.defineProperty;

var f$2 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject$1(O);
  P = _toPrimitive$1(P, true);
  _anObject$1(Attributes);
  if (_ie8DomDefine$1) try {
    return dP$1(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp$1 = {
	f: f$2
};

var _propertyDesc$1 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide$1 = _descriptors$1 ? function (object, key, value) {
  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty$1 = {}.hasOwnProperty;
var _has$1 = function (it, key) {
  return hasOwnProperty$1.call(it, key);
};

var id$1 = 0;
var px$1 = Math.random();
var _uid$1 = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
};

var _library$1 = false;

var _shared$1 = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global$1[SHARED] || (_global$1[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core$1.version,
  mode: _library$1 ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared$1('native-function-to-string', Function.toString);

var _redefine$1 = createCommonjsModule(function (module) {
var SRC = _uid$1('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core$1.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has$1(val, 'name') || _hide$1(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has$1(val, SRC) || _hide$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global$1) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide$1(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide$1(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction$1 = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx$1 = function (fn, that, length) {
  _aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE$2 = 'prototype';

var $export$1 = function (type, name, source) {
  var IS_FORCED = type & $export$1.F;
  var IS_GLOBAL = type & $export$1.G;
  var IS_STATIC = type & $export$1.S;
  var IS_PROTO = type & $export$1.P;
  var IS_BIND = type & $export$1.B;
  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] || (_global$1[name] = {}) : (_global$1[name] || {})[PROTOTYPE$2];
  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
  var expProto = exports[PROTOTYPE$2] || (exports[PROTOTYPE$2] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx$1(out, _global$1) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
    // extend global
    if (target) _redefine$1(target, key, out, type & $export$1.U);
    // export
    if (exports[key] != out) _hide$1(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global$1.core = _core$1;
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library`
var _export$1 = $export$1;

var toString$2 = {}.toString;

var _cof$1 = function (it) {
  return toString$2.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof$1(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined$1 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject$1 = function (it) {
  return Object(_defined$1(it));
};

// 7.1.4 ToInteger
var ceil$1 = Math.ceil;
var floor$1 = Math.floor;
var _toInteger$1 = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
};

// 7.1.15 ToLength

var min$2 = Math.min;
var _toLength$1 = function (it) {
  return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.2.2 IsArray(argument)

var _isArray$1 = Array.isArray || function isArray(arg) {
  return _cof$1(arg) == 'Array';
};

var _wks$1 = createCommonjsModule(function (module) {
var store = _shared$1('wks');

var Symbol = _global$1.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
};

$exports.store = store;
});

var SPECIES$2 = _wks$1('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray$1(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray$1(C.prototype))) C = undefined;
    if (_isObject$1(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject$1($this);
    var self = _iobject$1(O);
    var f = _ctx$1(callbackfn, that, 3);
    var length = _toLength$1(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

'use strict';


var _strictMethod = function (method, arg) {
  return !!method && _fails$1(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

'use strict';

var $forEach = _arrayMethods(0);
var STRICT = _strictMethod([].forEach, true);

_export$1(_export$1.P + _export$1.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var es6_array_forEach = {

};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks$1('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide$1(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables$1 = function (key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

var _iterStep$1 = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators$1 = {};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject$1 = function (it) {
  return _iobject$1(_defined$1(it));
};

var max$1 = Math.max;
var min$3 = Math.min;
var _toAbsoluteIndex$1 = function (index, length) {
  index = _toInteger$1(index);
  return index < 0 ? max$1(index + length, 0) : min$3(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject$1($this);
    var length = _toLength$1(O.length);
    var index = _toAbsoluteIndex$1(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared$1 = _shared$1('keys');

var _sharedKey$1 = function (key) {
  return shared$1[key] || (shared$1[key] = _uid$1(key));
};

var arrayIndexOf$2 = _arrayIncludes$1(false);
var IE_PROTO$3 = _sharedKey$1('IE_PROTO');

var _objectKeysInternal$1 = function (object, names) {
  var O = _toIobject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO$3) _has$1(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has$1(O, key = names[i++])) {
    ~arrayIndexOf$2(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys$1 = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys$1 = Object.keys || function keys(O) {
  return _objectKeysInternal$1(O, _enumBugKeys$1);
};

var _objectDps$1 = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject$1(O);
  var keys = _objectKeys$1(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp$1.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$4 = _global$1.document;
var _html$1 = document$4 && document$4.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$4 = _sharedKey$1('IE_PROTO');
var Empty$1 = function () { /* empty */ };
var PROTOTYPE$3 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict$1 = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate$1('iframe');
  var i = _enumBugKeys$1.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html$1.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict$1 = iframeDocument.F;
  while (i--) delete createDict$1[PROTOTYPE$3][_enumBugKeys$1[i]];
  return createDict$1();
};

var _objectCreate$1 = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty$1[PROTOTYPE$3] = _anObject$1(O);
    result = new Empty$1();
    Empty$1[PROTOTYPE$3] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$4] = O;
  } else result = createDict$1();
  return Properties === undefined ? result : _objectDps$1(result, Properties);
};

var def$1 = _objectDp$1.f;

var TAG$2 = _wks$1('toStringTag');

var _setToStringTag$1 = function (it, tag, stat) {
  if (it && !_has$1(it = stat ? it : it.prototype, TAG$2)) def$1(it, TAG$2, { configurable: true, value: tag });
};

'use strict';



var IteratorPrototype$1 = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide$1(IteratorPrototype$1, _wks$1('iterator'), function () { return this; });

var _iterCreate$1 = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate$1(IteratorPrototype$1, { next: _propertyDesc$1(1, next) });
  _setToStringTag$1(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$5 = _sharedKey$1('IE_PROTO');
var ObjectProto$1 = Object.prototype;

var _objectGpo$1 = Object.getPrototypeOf || function (O) {
  O = _toObject$1(O);
  if (_has$1(O, IE_PROTO$5)) return O[IE_PROTO$5];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto$1 : null;
};

'use strict';








var ITERATOR$5 = _wks$1('iterator');
var BUGGY$1 = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR$1 = '@@iterator';
var KEYS$1 = 'keys';
var VALUES$1 = 'values';

var returnThis$1 = function () { return this; };

var _iterDefine$1 = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate$1(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY$1 && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS$1: return function keys() { return new Constructor(this, kind); };
      case VALUES$1: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES$1;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$5] || proto[FF_ITERATOR$1] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag$1(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library$1 && typeof IteratorPrototype[ITERATOR$5] != 'function') _hide$1(IteratorPrototype, ITERATOR$5, returnThis$1);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES$1) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library$1 || FORCED) && (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$5])) {
    _hide$1(proto, ITERATOR$5, $default);
  }
  // Plug for library
  _iterators$1[NAME] = $default;
  _iterators$1[TAG] = returnThis$1;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES$1),
      keys: IS_SET ? $default : getMethod(KEYS$1),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine$1(proto, key, methods[key]);
    } else _export$1(_export$1.P + _export$1.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
  }
  return methods;
};

'use strict';





// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator$1 = _iterDefine$1(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject$1(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep$1(1);
  }
  if (kind == 'keys') return _iterStep$1(0, index);
  if (kind == 'values') return _iterStep$1(0, O[index]);
  return _iterStep$1(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators$1.Arguments = _iterators$1.Array;

_addToUnscopables$1('keys');
_addToUnscopables$1('values');
_addToUnscopables$1('entries');

var ITERATOR$6 = _wks$1('iterator');
var TO_STRING_TAG$1 = _wks$1('toStringTag');
var ArrayValues = _iterators$1.Array;

var DOMIterables$1 = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys$1(DOMIterables$1), i$2 = 0; i$2 < collections.length; i$2++) {
  var NAME$1 = collections[i$2];
  var explicit = DOMIterables$1[NAME$1];
  var Collection$1 = _global$1[NAME$1];
  var proto$1 = Collection$1 && Collection$1.prototype;
  var key;
  if (proto$1) {
    if (!proto$1[ITERATOR$6]) _hide$1(proto$1, ITERATOR$6, ArrayValues);
    if (!proto$1[TO_STRING_TAG$1]) _hide$1(proto$1, TO_STRING_TAG$1, NAME$1);
    _iterators$1[NAME$1] = ArrayValues;
    if (explicit) for (key in es6_array_iterator$1) if (!proto$1[key]) _redefine$1(proto$1, key, es6_array_iterator$1[key], true);
  }
}

var web_dom_iterable$1 = {

};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$3 = _wks$1('toStringTag');
// ES3 wrong here
var ARG$1 = _cof$1(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet$1 = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof$1 = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet$1(O = Object(it), TAG$3)) == 'string' ? T
    // builtinTag case
    : ARG$1 ? _cof$1(O)
    // ES3 arguments fallback
    : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

'use strict';
// 19.1.3.6 Object.prototype.toString()

var test = {};
test[_wks$1('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _redefine$1(Object.prototype, 'toString', function toString() {
    return '[object ' + _classof$1(this) + ']';
  }, true);
}

var es6_object_toString$1 = {

};

// true  -> String#at
// false -> String#codePointAt
var _stringAt$1 = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined$1(that));
    var i = _toInteger$1(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

'use strict';
var $at$1 = _stringAt$1(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine$1(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at$1(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var es6_string_iterator$1 = {

};

var f$3 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$3
};

var isEnum = _objectPie.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = _toIobject(it);
    var keys = _objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!_descriptors || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

// https://github.com/tc39/proposal-object-values-entries

var $entries = _objectToArray(true);

_export(_export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

var es7_object_entries = {

};

var entries = _core.Object.entries;

var entries$1 = entries;

var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
  _aFunction$1(callbackfn);
  var O = _toObject$1(that);
  var self = _iobject$1(O);
  var length = _toLength$1(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

'use strict';



_export$1(_export$1.P + _export$1.F * !_strictMethod([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

var es6_array_reduce = {

};

'use strict';

var $map = _arrayMethods(1);

_export$1(_export$1.P + _export$1.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

var es6_array_map = {

};

'use strict';

var $filter = _arrayMethods(2);

_export$1(_export$1.P + _export$1.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var es6_array_filter = {

};

// 20.2.2.22 Math.log2(x)


_export$1(_export$1.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

var es6_math_log2 = {

};

'use strict';



var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

'use strict';









_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var es6_array_from = {

};

var from_1 = _core.Array.from;

var from_1$1 = from_1;

//-------------------------------------------------
// Fast Fourier Transform
//-------------------------------------------------
function fft(signal) {
  var X = [],
      N = signal.length; // Base case is X = x + 0i since our input is assumed to be real only.

  if (N == 1) {
    if (isArray$1(signal[0])) //If input vector contains complex numbers
      return [[signal[0][0], signal[0][1]]];else return [[signal[0], 0]];
  } // Recurse: all even samples


  var X_evens = fft(signal.filter(even)),
      // Recurse: all odd samples
  X_odds = fft(signal.filter(odd)); // Now, perform N/2 operations!

  for (var k = 0; k < N / 2; k++) {
    // t is a complex number!
    var t = X_evens[k],
        e = complexMultiply(exponent(k, N), X_odds[k]);
    X[k] = complexAdd(t, e);
    X[k + N / 2] = complexSubtract(t, e);
  }

  function even(__, ix) {
    return ix % 2 == 0;
  }

  function odd(__, ix) {
    return ix % 2 == 1;
  }

  return X;
}

var fft_2 = fft; //-------------------------------------------------
// Calculate FFT Magnitude for complex numbers.
//-------------------------------------------------

var fftMag = function fftMag(fftBins) {
  var ret = fftBins.map(complexMagnitude);
  return ret.slice(0, ret.length / 2);
};

var fftMag_1 = fftMag; //-------------------------------------------------
// Calculate Frequency Bins
// 
// Returns an array of the frequencies (in hertz) of
// each FFT bin provided, assuming the sampleRate is
// samples taken per second.
//-------------------------------------------------

var fftFreq = function fftFreq(fftBins, sampleRate) {
  var stepFreq = sampleRate / fftBins.length;
  var ret = fftBins.slice(0, fftBins.length / 2);
  return ret.map(function (__, ix) {
    return ix * stepFreq;
  });
};

var fftFreq_1 = fftFreq; //-------------------------------------------------
// Complex exponent
//-------------------------------------------------

var mapExponent = {},
    exponent = function exponent(k, N) {
  var x = -2 * Math.PI * (k / N);
  mapExponent[N] = mapExponent[N] || {};
  mapExponent[N][k] = mapExponent[N][k] || [Math.cos(x), Math.sin(x)]; // [Real, Imaginary]

  return mapExponent[N][k];
}; //-------------------------------------------------
// Multiply two complex numbers
//
// (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
//-------------------------------------------------


var complexMultiply = function complexMultiply(a, b) {
  return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
}; //-------------------------------------------------
// Add two complex numbers
//-------------------------------------------------


var complexAdd = function complexAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}; //-------------------------------------------------
// Subtract two complex numbers
//-------------------------------------------------


var complexSubtract = function complexSubtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}; //-------------------------------------------------
// Calculate |a + bi|
//
// sqrt(a*a + b*b)
//-------------------------------------------------


var complexMagnitude = function complexMagnitude(c) {
  return Math.sqrt(c[0] * c[0] + c[1] * c[1]);
};

var fft_1 = {
  fft: fft_2,
  fftMag: fftMag_1,
  fftFreq: fftFreq_1
};

var fft$1 = fft_1.fft;
var fftMag$1 = fft_1.fftMag;
var fftFreq$1 = fft_1.fftFreq; // at the moment we only consider a static tuning frequency: A4=440Hz

var fref = 440;
var fmin = 55; // corresponding to A7

var fmax = 3520; // corresponding to A1
// generate this ahead of time to save compute

var temperedScale = generateEqualTemperedScale();
var length = 0.5 * (4 / 3); // Calculates the HPCP according to Gomez (2006)

function harmonicPCP(_x, _x2) {
  return _harmonicPCP.apply(this, arguments);
}

function _harmonicPCP() {
  _harmonicPCP = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee4(signal, samplerate) {
    var chromagram, freqPeaks, signalPromises, promises;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            chromagram = from_1$1({
              length: 12
            }, function (v, k) {
              return [];
            });
            _context4.next = 3;
            return peakDetection(signal, samplerate);

          case 3:
            freqPeaks = _context4.sent;
            signalPromises = freqPeaks.map(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee2(peak) {
                var distancePromises;
                return regenerator.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        distancePromises = temperedScale.map(
                        /*#__PURE__*/
                        function () {
                          var _ref2 = _asyncToGenerator(
                          /*#__PURE__*/
                          regenerator.mark(function _callee(f_bin, i) {
                            var d, weight;
                            return regenerator.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    d = 12 * Math.log2(peak['f'] / f_bin);

                                    if (Math.abs(d) <= length) {
                                      weight = Math.cos(Math.PI / 2 * (d / length));
                                      chromagram[i % 12].push(weight * Math.pow(peak['y'], 2));
                                    }

                                    ;

                                  case 3:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x15, _x16) {
                            return _ref2.apply(this, arguments);
                          };
                        }());
                        _context2.next = 3;
                        return promise$1.all(distancePromises);

                      case 3:
                        return _context2.abrupt("return");

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x14) {
                return _ref.apply(this, arguments);
              };
            }());
            _context4.next = 7;
            return promise$1.all(signalPromises);

          case 7:
            promises = chromagram.map(
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee3(bin) {
                return regenerator.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt("return", bin.reduce(function (a, b) {
                          return a + b;
                        }, 0));

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x17) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context4.next = 10;
            return promise$1.all(promises);

          case 10:
            return _context4.abrupt("return", _context4.sent);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _harmonicPCP.apply(this, arguments);
}

var harmonicPCP_1 = harmonicPCP;

function peakDetection(_x3, _x4) {
  return _peakDetection.apply(this, arguments);
}

function _peakDetection() {
  _peakDetection = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee6(signal, samplerate) {
    var spectogram, promises, data;
    return regenerator.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return windowedDFT(signal, samplerate);

          case 2:
            spectogram = _context6.sent;
            promises = spectogram['freqs'].map(
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee5(f, i) {
                var peak;
                return regenerator.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!(spectogram['y'][i - 1] < spectogram['y'][i] && spectogram['y'][i] > spectogram['y'][i + 1])) {
                          _context5.next = 5;
                          break;
                        }

                        _context5.next = 3;
                        return parabolaPeakInterpolation(f, spectogram['y'], i);

                      case 3:
                        peak = _context5.sent;
                        return _context5.abrupt("return", peak);

                      case 5:
                        ;

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x18, _x19) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context6.next = 6;
            return promise$1.all(promises);

          case 6:
            data = _context6.sent;
            return _context6.abrupt("return", data.filter(function (p) {
              return p !== undefined;
            }));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _peakDetection.apply(this, arguments);
}

var peakDetection_1 = peakDetection;

function parabolaPeakInterpolation(_x5, _x6, _x7) {
  return _parabolaPeakInterpolation.apply(this, arguments);
}

function _parabolaPeakInterpolation() {
  _parabolaPeakInterpolation = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee7(freq, y, idx) {
    var peak;
    return regenerator.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getParabolaPeak(y[idx - 1], y[idx], y[idx + 1], freq);

          case 2:
            peak = _context7.sent;

            if (!(peak['f'] > fmin & peak['f'] < fmax)) {
              _context7.next = 7;
              break;
            }

            if (!(peak['y'] > 0.1)) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", peak);

          case 6:
            ;

          case 7:
            ;

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _parabolaPeakInterpolation.apply(this, arguments);
}

var parabolaPeakInterpolation_1 = parabolaPeakInterpolation;

function getParabolaPeak(_x8, _x9, _x10, _x11) {
  return _getParabolaPeak.apply(this, arguments);
}

function _getParabolaPeak() {
  _getParabolaPeak = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee8(a, b, c, f) {
    var p, f_hat, y;
    return regenerator.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            p = (a - c) / (a - 2 * b + c) / 2;
            f_hat = f + p;
            y = b - (a - c) * (p / 4);
            return _context8.abrupt("return", {
              'f': f_hat,
              'y': y
            });

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getParabolaPeak.apply(this, arguments);
}

var getParabolaPeak_1 = getParabolaPeak;

function windowedDFT(_x12, _x13) {
  return _windowedDFT.apply(this, arguments);
}

function _windowedDFT() {
  _windowedDFT = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee10(signal, samplerate) {
    var promises, windowed, phasors, freqs, magnitudes;
    return regenerator.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            promises = signal.map(
            /*#__PURE__*/
            function () {
              var _ref5 = _asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee9(y, i) {
                var value;
                return regenerator.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return y;

                      case 2:
                        _context9.t0 = _context9.sent;
                        _context9.t1 = 0.54 - 0.46 * Math.cos(2 * Math.PI * i / (signal.length - 1));
                        value = _context9.t0 * _context9.t1;
                        return _context9.abrupt("return", value);

                      case 6:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x20, _x21) {
                return _ref5.apply(this, arguments);
              };
            }());
            _context10.next = 3;
            return promise$1.all(promises);

          case 3:
            windowed = _context10.sent;
            phasors = fft$1(windowed);
            freqs = fftFreq$1(phasors, samplerate);
            magnitudes = fftMag$1(phasors);
            return _context10.abrupt("return", {
              'freqs': freqs,
              'y': magnitudes
            });

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _windowedDFT.apply(this, arguments);
}

var windowedDFT_1 = windowedDFT;

function generateEqualTemperedScale() {
  var ratios = [];

  for (var i = 0; i < 12; i++) {
    ratios.push(Math.pow(2, i / 12));
  }

  var scale = [];

  var _loop = function _loop(_i) {
    ratios.forEach(function (r) {
      scale.push(r * (fref * Math.pow(2, _i)));
    });
  };

  for (var _i = -3; _i <= 2; _i++) {
    _loop(_i);
  }

  ;
  return scale;
}

var generateEqualTemperedScale_1 = generateEqualTemperedScale;
var hpcp = {
  harmonicPCP: harmonicPCP_1,
  peakDetection: peakDetection_1,
  parabolaPeakInterpolation: parabolaPeakInterpolation_1,
  getParabolaPeak: getParabolaPeak_1,
  windowedDFT: windowedDFT_1,
  generateEqualTemperedScale: generateEqualTemperedScale_1
};

var basic = {
	"A:min": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:maj": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A#:min": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:maj": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"B:min": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:maj": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C:min": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:maj": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C#:min": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:maj": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D:min": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:maj": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D#:min": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:maj": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"E:min": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:maj": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"F:min": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:maj": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"F#:min": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:maj": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"G:min": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:maj": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G#:min": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:maj": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
]
};

var basic$1 = /*#__PURE__*/Object.freeze({
	default: basic
});

var extended = {
	"A:min": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:maj": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:maj7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"A:min7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0
],
	"A:minmaj7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"A:dom7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"A:dim": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0
],
	"A:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"A:hdim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"A#:min": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:maj": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:maj7": [
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:min7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0
],
	"A#:minmaj7": [
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:dom7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"A#:dim": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A#:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"A#:hdim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"B:min": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:maj": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:maj7": [
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:min7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0
],
	"B:minmaj7": [
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:dom7": [
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:dim": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"B:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"B:hdim7": [
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"C:min": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:maj": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:maj7": [
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:min7": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1
],
	"C:minmaj7": [
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:dom7": [
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:dim": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C:hdim7": [
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C#:min": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:maj": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:maj7": [
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:min7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:minmaj7": [
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:dom7": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:dim": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C#:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C#:hdim7": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"D:min": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:maj": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:maj7": [
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:min7": [
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:minmaj7": [
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:dom7": [
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:dim": [
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D:hdim7": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D#:min": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:maj": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:maj7": [
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:min7": [
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:minmaj7": [
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:dom7": [
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:dim": [
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:hdim7": [
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"E:min": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:maj": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:maj7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1
],
	"E:min7": [
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:minmaj7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0
],
	"E:dom7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:dim": [
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:hdim7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0
],
	"F:min": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:maj": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"F:maj7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0
],
	"F:min7": [
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:minmaj7": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1
],
	"F:dom7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0
],
	"F:dim": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:hdim7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1
],
	"F#:min": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:maj": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:maj7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0
],
	"F#:min7": [
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:minmaj7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0
],
	"F#:dom7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"F#:dim": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"F#:hdim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"G:min": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:maj": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:maj7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0
],
	"G:min7": [
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0
],
	"G:minmaj7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0
],
	"G:dom7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0
],
	"G:dim": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"G:hdim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"G#:min": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:maj": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:maj7": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1
],
	"G#:min7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1
],
	"G#:minmaj7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1
],
	"G#:dom7": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1
],
	"G#:dim": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1
],
	"G#:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"G#:hdim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1
]
};

var extended$1 = /*#__PURE__*/Object.freeze({
	default: extended
});

var full = {
	"A:min": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:maj": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:maj7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"A:min7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0
],
	"A:minmaj7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"A:dom7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"A:dim": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0
],
	"A:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"A:hdim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"A:maj6": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"A:min6": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"A:maj9": [
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:min9": [
	1,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:aug": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A:aug7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"A:sus2": [
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A:sus4": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A#:min": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:maj": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:maj7": [
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:min7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0
],
	"A#:minmaj7": [
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:dom7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"A#:dim": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"A#:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"A#:hdim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"A#:maj6": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0
],
	"A#:min6": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"A#:maj9": [
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:min9": [
	0,
	1,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:aug": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"A#:aug7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1
],
	"A#:sus2": [
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"A#:sus4": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0
],
	"B:min": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:maj": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:maj7": [
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:min7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0
],
	"B:minmaj7": [
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:dom7": [
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:dim": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"B:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"B:hdim7": [
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"B:maj6": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1
],
	"B:min6": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1
],
	"B:maj9": [
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"B:min9": [
	0,
	0,
	1,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:aug": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"B:aug7": [
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"B:sus2": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"B:sus4": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"C:min": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:maj": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:maj7": [
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:min7": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1
],
	"C:minmaj7": [
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:dom7": [
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:dim": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C:hdim7": [
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"C:maj6": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:min6": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:maj9": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C:min9": [
	0,
	0,
	0,
	1,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"C:aug": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C:aug7": [
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C:sus2": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"C:sus4": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"C#:min": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:maj": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:maj7": [
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:min7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:minmaj7": [
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:dom7": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:dim": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C#:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C#:hdim7": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"C#:maj6": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"C#:min6": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:maj9": [
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	1
],
	"C#:min9": [
	0,
	0,
	0,
	0,
	1,
	1,
	0,
	1,
	0,
	0,
	0,
	1
],
	"C#:aug": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"C#:aug7": [
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"C#:sus2": [
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"C#:sus4": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1
],
	"D:min": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:maj": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:maj7": [
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:min7": [
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:minmaj7": [
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:dom7": [
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:dim": [
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D:hdim7": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"D:maj6": [
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:min6": [
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"D:maj9": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0
],
	"D:min9": [
	1,
	0,
	0,
	0,
	0,
	1,
	1,
	0,
	1,
	0,
	0,
	0
],
	"D:aug": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:aug7": [
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"D:sus2": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0
],
	"D:sus4": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"D#:min": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:maj": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:maj7": [
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:min7": [
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:minmaj7": [
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:dom7": [
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:dim": [
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:hdim7": [
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:maj6": [
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:min6": [
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"D#:maj9": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0
],
	"D#:min9": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	1,
	0,
	1,
	0,
	0
],
	"D#:aug": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:aug7": [
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"D#:sus2": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0
],
	"D#:sus4": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"E:min": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:maj": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:maj7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1
],
	"E:min7": [
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:minmaj7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1,
	0
],
	"E:dom7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:dim": [
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:hdim7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:maj6": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:min6": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"E:maj9": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1
],
	"E:min9": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	1,
	0,
	1,
	0
],
	"E:aug": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:aug7": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	1
],
	"E:sus2": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"E:sus4": [
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0
],
	"F:min": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:maj": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"F:maj7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0
],
	"F:min7": [
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:minmaj7": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	1
],
	"F:dom7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0
],
	"F:dim": [
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:hdim7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1
],
	"F:maj6": [
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0
],
	"F:min6": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"F:maj9": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"F:min9": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	1,
	0,
	1
],
	"F:aug": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"F:aug7": [
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0,
	0
],
	"F:sus2": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"F:sus4": [
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0
],
	"F#:min": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:maj": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:maj7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0
],
	"F#:min7": [
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:minmaj7": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0
],
	"F#:dom7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"F#:dim": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:dim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"F#:hdim7": [
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0
],
	"F#:maj6": [
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"F#:min6": [
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0
],
	"F#:maj9": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1
],
	"F#:min9": [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	1,
	0
],
	"F#:aug": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0
],
	"F#:aug7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0,
	0
],
	"F#:sus2": [
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1
],
	"F#:sus4": [
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0
],
	"G:min": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:maj": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:maj7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0
],
	"G:min7": [
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1,
	0
],
	"G:minmaj7": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0
],
	"G:dom7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0
],
	"G:dim": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:dim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0
],
	"G:hdim7": [
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0
],
	"G:maj6": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0
],
	"G:min6": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0
],
	"G:maj9": [
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:min9": [
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	1
],
	"G:aug": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0
],
	"G:aug7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1,
	0
],
	"G:sus2": [
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G:sus4": [
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0
],
	"G#:min": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:maj": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:maj7": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1
],
	"G#:min7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1,
	0,
	0,
	0,
	1
],
	"G#:minmaj7": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	1
],
	"G#:dom7": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1
],
	"G#:dim": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	1
],
	"G#:dim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	1
],
	"G#:hdim7": [
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1
],
	"G#:maj6": [
	0,
	0,
	0,
	1,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1
],
	"G#:min6": [
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	1
],
	"G#:maj9": [
	0,
	1,
	0,
	1,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:min9": [
	1,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:aug": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
],
	"G#:aug7": [
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	1
],
	"G#:sus2": [
	0,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	1
],
	"G#:sus4": [
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	0,
	0,
	0,
	0,
	1
]
};

var full$1 = /*#__PURE__*/Object.freeze({
	default: full
});

var _basic = getCjsExportFromNamespace(basic$1);

var _extended = getCjsExportFromNamespace(extended$1);

var _full = getCjsExportFromNamespace(full$1);

var harmonicPCP$1 = hpcp.harmonicPCP;
var sampleRate = 44100;
var hopLength = 1024;
var bufferLength = sampleRate * 1; // currently hard-coded to one second

/*
---------------------------------------------------------
Audio processing
---------------------------------------------------------
handleAudio: async function to extract chroma from incoming audio
trimBuffer: interval function to limit number of frames in chromaBuffer to bufferLength

TODO: Move feature extraction into worker thread using an audioBuffer
*/

function handleData(_x, _x2, _x3) {
  return _handleData.apply(this, arguments);
}

function _handleData() {
  _handleData = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(audio, buffer, event) {
    var hpcp;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(audio.length === 0)) {
              _context.next = 5;
              break;
            }

            event += 1;

            if (event >= Math.floor(sampleRate / hopLength) * 2 & buffer.length > 0) {
              // After 2 seconds of no data, the chromaBuffer times out and resets
              console.log('No audio for 2 seconds so the audio buffer has been cleared.');
              buffer = [];
            }

            _context.next = 10;
            break;

          case 5:
            _context.next = 7;
            return harmonicPCP$1(audio, sampleRate);

          case 7:
            hpcp = _context.sent;
            buffer.push(hpcp);
            event = 0; // Reset event tracker because we received new data

          case 10:
            ;
            return _context.abrupt("return", [buffer, event]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handleData.apply(this, arguments);
}

var handleData_1 = handleData;

function trimBuffer(buffer) {
  if (buffer.length > Math.floor(bufferLength / hopLength)) {
    buffer.reverse().splice(bufferLength / hopLength);
    buffer.reverse();
  }

  ;
  return buffer;
}

var trimBuffer_1 = trimBuffer; // const audioBuffer = [];
// setInterval(featureExtraction, 50);
//
// async function featureExtraction() {
// 	if (audioBuffer.length > bufferLength) {
// 		// Trim audio buffer to buffer length if necessary
// 		audioBuffer.reverse().splice(bufferLength);
// 		audioBuffer.reverse();
// 	}
// 	if (audioBuffer.length > sampleLength) {
// 		for (let i = (audioBuffer.length / hopLength) - 1; i > 0; i--) {
// 			startIndex = i*hopLength - hopLength;
// 			hpcp = await harmonicPCP(audioBuffer[startIndex, sampleLength], sampleRate);
// 			chromagram.push(hpcp);
// 			chromaCount += 1;
// 		}
// 	}
// }

/* 
---------------------------------------------------------
Chord Detection
---------------------------------------------------------
detectChord: interval function to detect chord in chromaBuffer using binary template method
*/

var templates = {
  'basic': _basic,
  'extended': _extended,
  'full': _full
};
var model = templates['basic']; // defaults to basic model

function detectChord(_x4) {
  return _detectChord.apply(this, arguments);
}

function _detectChord() {
  _detectChord = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee3(buffer) {
    var chord, chromagram, promises, scores, max_score;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            chord = 'N';

            if (!(buffer.length > 0)) {
              _context3.next = 11;
              break;
            }

            // average all chroma in chromaBuffer
            chromagram = buffer.reduce(sumVertical).map(function (i) {
              return i / buffer.length;
            }); // iterate over model async and update distance if less than previous

            promises = entries$1(model).map(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee2(obj) {
                var key, target, distance;
                return regenerator.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        key = obj[0];
                        target = obj[1];
                        _context2.next = 4;
                        return dotProduct(chromagram, target);

                      case 4:
                        distance = _context2.sent;
                        return _context2.abrupt("return", {
                          'chord': key,
                          'score': distance
                        });

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x7) {
                return _ref.apply(this, arguments);
              };
            }());
            _context3.next = 6;
            return promise$1.all(promises);

          case 6:
            scores = _context3.sent;
            // Get minimum distance and key
            max_score = 0;
            scores.forEach(function (obj) {
              if (obj['score'] > max_score) {
                max_score = obj['score'];
                chord = obj['chord'];
              }

              ;
            });
            _context3.next = 12;
            break;

          case 11:
            console.log('No data found in buffer');

          case 12:
            ;
            return _context3.abrupt("return", chord);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _detectChord.apply(this, arguments);
}

var detectChord_1 = detectChord;

function dotProduct(_x5, _x6) {
  return _dotProduct.apply(this, arguments);
}

function _dotProduct() {
  _dotProduct = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee5(data, target) {
    var promises, scores;
    return regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            promises = data.map(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regenerator.mark(function _callee4(bin, i) {
                return regenerator.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return bin;

                      case 2:
                        _context4.t0 = _context4.sent;
                        _context4.t1 = target[i];
                        return _context4.abrupt("return", _context4.t0 * _context4.t1);

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x8, _x9) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context5.next = 3;
            return promise$1.all(promises);

          case 3:
            scores = _context5.sent;
            return _context5.abrupt("return", scores.reduce(function (a, b) {
              return a + b;
            }, 0));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _dotProduct.apply(this, arguments);
}

var dotProduct_1 = dotProduct;

var sumVertical = function sumVertical(r, a) {
  return r.map(function (b, i) {
    return a[i] + b;
  });
};

var sumVertical_1 = sumVertical;
var main = {
  handleData: handleData_1,
  trimBuffer: trimBuffer_1,
  detectChord: detectChord_1,
  dotProduct: dotProduct_1,
  sumVertical: sumVertical_1
};

outlets = 2;
var handleData$1 = main.handleData;
var detectChord$1 = main.detectChord;
var trimBuffer$1 = main.trimBuffer;
var sampleRate$1 = 44100;
var sampleLength = 4096;
var hopLength$1 = 1024;
var bufferLength$1 = sampleRate$1 * 1;
var eventTracker = 0;
var chromaBuffer = [];
post('Initialized sample rate to', sampleRate$1, 'samples');
post('Initialized sample length to', sampleLength, 'samples');
post('Initialized hop length to', hopLength$1, 'samples');
post('Initialized buffer length to', bufferLength$1, 'samples');
post('Initialized model type to basic');

function setSampleRate(value) {
  sampleRate$1 = value;
  post('Set sample rate to', sampleRate$1);
}

function setSampleLength(value) {
  sampleLength = value;
  post('Set sample length to', sampleLength);
}

function setHopLength(value) {
  hopLength$1 = value;
  post('Set hop length to', hopLength$1);
}
/*
The audio processing step is the most CPU intensive step of the process.
In essence, we are using STFT on slices of a signal buffer. The frames and timing
are handled by Max. This handler simply processes the data found in the buffer
from start_frame to end_frame and appends the resulting chroma to the chromaBuffer list
which is stored and maintained in memory by trimBuffer. 

PCPDict allows Max to access the average PCP profile for visualization purposes.
*/


var bufferArray = new Array();
bufferArray[0] = new Buffer("audioBuffer0");
bufferArray[1] = new Buffer("audioBuffer1");
bufferArray[2] = new Buffer("audioBuffer2");
bufferArray[3] = new Buffer("audioBuffer3"); // var displayChromagram = new Dict('displayChromagram')

function process$3(_x) {
  return _process.apply(this, arguments);
}

function _process() {
  _process = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee(end_frame) {
    var audioFrame, _ref, _ref2;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            audioFrame = bufferArray[i % 4].peek(1, end_frame, end_frame);
            i++;

            if (i >= 4) {
              i = 0;
            }

            ;
            _context.next = 6;
            return handleData$1(audioFrame, chromaBuffer, eventTracker);

          case 6:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 2);
            chromaBuffer = _ref2[0];
            eventTracker = _ref2[1];

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _process.apply(this, arguments);
}

function trim() {
  chromaBuffer = trimBuffer$1(chromaBuffer);
  post('Trimming buffer');
}

function detect() {
  return _detect.apply(this, arguments);
}

function _detect() {
  _detect = _asyncToGenerator(
  /*#__PURE__*/
  regenerator.mark(function _callee2() {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return detectChord$1(chromaBuffer);

          case 2:
            chord = _context2.sent;
            outlet(1, chord);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _detect.apply(this, arguments);
}

var achord = {};